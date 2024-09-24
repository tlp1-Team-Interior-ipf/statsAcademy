import { UserModel } from "./user.js";
import { Chat } from "./modelChat.js";
import { EvaluacionesModel } from "./evaluaciones.js";
import { PreguntasModel } from "./preguntas.js";
import { RespuestasModel } from "./respuestas.js";

const relations = () => {
    // relacion de uno a muchos con la tabla User y la tabla Chat
    UserModel.hasMany(Chat, {
        foreignKey: 'userId',
        as: 'chats',
        onDelete: 'CASCADE',
    });

    Chat.belongsTo(UserModel, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
    });

    // relacion de uno a muchos con la tabla Evaluaciones y la tabla de preguntas
    EvaluacionesModel.hasMany(PreguntasModel, {
        foreignKey: 'evaluacionId',
        as: 'preguntas',
    });

    PreguntasModel.belongsTo(EvaluacionesModel, {
        foreignKey: 'evaluacionId',
        as: 'evaluacion',
    });

    // relacion de uno a uno con la tabla Preguntas y la tabla de Respuestas
    PreguntasModel.hasOne(RespuestasModel, {
        foreignKey: 'preguntaId',
        as: 'respuesta',
    });

    RespuestasModel.belongsTo(PreguntasModel, {
        foreignKey: 'preguntaId',
        as: 'pregunta',
    });
};

export default relations;