// apiCaller.ts
import ApiCallerStore from '../store/ApiCallerStore';
import {ApiConfig,} from '../types/Types.tsx';

export const callDeepSeekApi = async ({token, inputValue, onMessage, onComplete}: ApiConfig) => {
    const { setLoading, controller, setController } = ApiCallerStore.getState();
    if (controller && !controller.signal.aborted) {
        controller.abort();
    }

    // 创建一个新的 AbortController 实例
    const newController = new AbortController();
    setController(newController);

    setLoading(true);

    try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                messages: [{ content: inputValue, role: 'user' }],
                model: 'deepseek-coder',
                frequency_penalty: 0,
                max_tokens: 2048,
                presence_penalty: 0,
                stream: true,
                temperature: 1,
                top_p: 1,
                logprobs: false,
                top_logprobs: null
            }),
            signal: newController.signal // 使用新的 AbortController 实例
        });

        const reader = response.body?.getReader();
        const decoder = new TextDecoder('utf-8');
        let combinedContent = '';
        const messageId = 'assistant-message-' + Date.now();

        const readStream = async () => {
            while (true) {
                const { done, value } = await reader?.read()!;
                if (done) {
                    onComplete({ id: messageId });
                    setLoading(false);
                    break;
                }

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter(line => line.trim() !== '');

                for (const line of lines) {
                    if (line === 'data: [DONE]') {
                        onComplete({ id: messageId });
                        setLoading(false);
                        return;
                    }

                    if (line.startsWith('data: ')) {
                        const json = JSON.parse(line.substring(6));
                        const deltaContent = json.choices[0].delta.content;
                        if (deltaContent) {
                            combinedContent += deltaContent;
                            onMessage({ content: combinedContent, role: 'assistant', id: messageId });
                        }
                    }
                }
            }
        };

        await readStream();
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('请求被取消');
        } else {
            console.error('API调用失败:', error);
        }
        setLoading(false);
    }
};
