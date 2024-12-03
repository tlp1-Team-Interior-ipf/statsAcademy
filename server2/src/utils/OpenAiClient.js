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

export const evaluateResponse = async (message, topic) => {
    
    try {
        const evaluation = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', 
                    content: `
                    Eres un evaluador que califica respuestas de estudiantes. Evalúa si la siguiente respuesta muestra comprensión del tema "${topic}".
                    Responde solo con un número entre 0 y 100 (sin texto adicional). Si no puedes calificar, responde únicamente "NA".
                    No califiques si la respuesta no hace referencia directa a las preguntas de evaluación.
                    Respuesta del estudiante: ${message}.
                    ` 
                },
                { role: 'assistant', content: message }
            ],
            temperature: 0.3,
        });

        const comprehensionLevel = evaluation.choices[0].message.content;
        if (comprehensionLevel === "NA") {
            return null;
        }
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
        const comprehensionLevel = await evaluateResponse(message, nextTopic.name);
        console.log(comprehensionLevel);
            if (comprehensionLevel === null) {
                return 'Tu respuesta no hace referencia a las preguntas de evaluación. Por favor, intenta de nuevo.';
            } else {
                await Ratings.create({ userId, topicId: nextTopic.id, note: comprehensionLevel });
                
                if (comprehensionLevel >= 60) {
                    await updateTopicStatus(nextTopic.id, userId);
                    return '¡Excelente! Has demostrado un buen entendimiento del tema. Puedes continuar con el siguiente tema.';
                } else {
                    return 'Tu respuesta no demuestra un buen entendimiento del tema. Por favor, intenta de nuevo.';
                }
            }
    } catch (error) {
        DatabaseError(error);
    }
};