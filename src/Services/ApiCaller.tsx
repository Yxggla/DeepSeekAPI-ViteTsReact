// apiCaller.ts

import axios from 'axios';

interface ApiConfig {
    token: string;
    inputValue: string;
}

export const callDeepSeekApi = async ({ token, inputValue }: ApiConfig) => {
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
        "stream": false,
        "temperature": 1,
        "top_p": 1,
        "logprobs": false,
        "top_logprobs": null
    });

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.deepseek.com/chat/completions',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: data
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
