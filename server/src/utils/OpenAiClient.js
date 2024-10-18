import Openai from 'openai';
import { environments } from '../config/environments.js';
import { DatabaseError } from './errorHandler.js';

const openai = new Openai({
    apikey: environments.OPENAI_API_KEY,
});

export const fetchOpenAIResponse = async (messages) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: messages,
            temperature: 0.7,
        });

        console.log(messages);
        const modelResponse = response.choices[0].message.content;
        if (!modelResponse) throw new Error('No se pudo obtener una respuesta del modelo');
        
        return modelResponse;
    } catch (error) {
        DatabaseError(error);
    }
};

export const evaluateResponse = async (modelResponse) => {
    try {
        const evaluation = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: `Evalúa si el estudiante entendió el tema. Respuesta numérica de 0 a 100.` },
                { role: 'assistant', content: modelResponse }
            ],
            temperature: 0.3,
        });

        const comprehensionLevel = parseInt(evaluation.choices[0].message.content);
        return comprehensionLevel;
    } catch (error) {
        DatabaseError(error);
    }
};