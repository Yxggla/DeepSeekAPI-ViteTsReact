// apiCaller.ts

import {Message} from '../types/Types.tsx';

interface ApiConfig {
    token: string;
    inputValue: string;
    onMessage: (message: Message) => void;
    onComplete: (messageId: { id: string }) => void;
}

export const callDeepSeekApi = async ({token, inputValue, onMessage, onComplete}: ApiConfig) => {
    const data = JSON.stringify({
        "messages": [
            {
                "content": inputValue,
                "role": "user"
            }
        ],
        "model": "deepseek-coder",
        "frequency_penalty": 0,
        "max_tokens": 2048,
        "presence_penalty": 0,
        "stop": null,
        "stream": true,
        "temperature": 1,
        "top_p": 1,
        "logprobs": false,
        "top_logprobs": null
    });
        //v1 fetch

        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: data
        });

        const reader = response.body?.getReader();
        const decoder = new TextDecoder('utf-8');
        let combinedContent = '';
        const messageId = 'assistant-message-' + Date.now();


        const readStream = async () => {
            while (true) {
                const {done, value} = await reader?.read()!;
                if (done) {
                    console.log('Combined Content:', combinedContent);
                    onComplete({id: messageId});
                    break;
                }

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter(line => line.trim() !== '');

                for (const line of lines) {
                    if (line === 'data: [DONE]') {
                        console.log('Stream completed');
                        onComplete({id: messageId});
                        return;
                    }

                    if (line.startsWith('data: ')) {
                        const json = JSON.parse(line.substring(6));
                        const deltaContent = json.choices[0].delta.content;
                        if (deltaContent) {
                            combinedContent += deltaContent;
                            onMessage({content: combinedContent, role: 'assistant', id: messageId});
                        }
                    }
                }
            }
        };

        await readStream();
    }
    ;
