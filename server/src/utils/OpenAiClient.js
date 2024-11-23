import Openai from 'openai';
import { environments } from '../config/environments.js';
import { DatabaseError } from './errorHandler.js';
import { Ratings } from '../models/Ratings.js';
import { updateTopicStatus } from '../helpers/TopicsHelpers.js';

const openai = new Openai({
    apikey: environments.OPENAI_API_KEY,
});

export const fetchOpenAIResponse = async (messages) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: messages,
            temperature: 0.7,
        });

        const modelResponse = response.choices[0].message.content;
        if (!modelResponse) throw new Error('No se pudo obtener una respuesta del modelo');
        
        return modelResponse;
    } catch (error) {
        DatabaseError(error);
    }
};

export const evaluateResponse = async (modelResponse, topic) => {
    try {
        const evaluation = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: `Evalúa si el estudiante ha mostrado un buen entendimiento del tema: ${topic} en su respuesta: ${modelResponse}. Evalúa en un rango de 0 a 100 las respuestas solo si claramente hacen referencia a las preguntas de evaluación, si no solo no hagas una devolución.` },
                { role: 'assistant', content: modelResponse }
            ],
            temperature: 0.3,
        });

        const comprehensionLevel = evaluation.choices[0].message.content;
        const comprehension = parseInt(comprehensionLevel);
        return isNaN(comprehension) ? null : comprehension;
    } catch (error) {
        DatabaseError(error);
    }
};


export const generateQuestionsForTopic = async (topic) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: `Genera 3 preguntas claras y específicas para evaluar el entendimiento de los estudiantes sobre el tema: ${topic}. Las preguntas deben estar relacionadas directamente con el tema.` },
            ],
            temperature: 0.5,
        });

        const questions = response.choices[0].message.content.split('\n').filter(q => q.trim() !== '');
        if (!questions.length) throw new Error('No se pudieron generar preguntas.');

        return questions;
    } catch (error) {
        DatabaseError(error);
    };
};


export const handleEvaluation = async (message, userId, nextTopic) => {
    try {
        const comprehensionLevel = await evaluateResponse(message, nextTopic);
        if ( isNaN(comprehensionLevel) ) console.log('No se pudo evaluar la respuesta');
        await Ratings.create({ userId, topicId: nextTopic.id, note: comprehensionLevel });
        console.log(comprehensionLevel);
        if (comprehensionLevel >= 70) {
            await updateTopicStatus(nextTopic.id, userId);
            return '¡Excelente! Has demostrado un buen entendimiento del tema. Puedes continuar con el siguiente tema.';
        } else {
            return 'Tu respuesta no demuestra un buen entendimiento del tema. Por favor, intenta de nuevo.';
        }
    } catch (error) {
        DatabaseError(error);
    }
};