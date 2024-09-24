import { UserModel } from "./user.js";
import { Chat } from "./modelChat.js";
import { EvaluacionesModel } from "./evaluaciones.js";
import { PreguntasModel } from "./preguntas.js";
import { RespuestasModel } from "./respuestas.js";
import { Programa } from "./programa.js";
import { Unidades } from "./unidades.js";
import { Temas } from "./temas.js";

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

    // relacion de uno a muchos con la tabla Programa y la tabla de Unidades
    Programa.hasMany(Unidades, {
        foreignKey: 'programaId',
        as: 'unidades',
    });

    Unidades.belongsTo(Programa, {
        foreignKey: 'programaId',
        as: 'programa',
    });

    // relacion de uno a muchos con la tabla Unidades y la tabla de Temas
    Unidades.hasMany(Temas, {
        foreignKey: 'unidadId',
        as: 'temas',
    });

    Temas.belongsTo(Unidades, {
        foreignKey: 'unidadId',
        as: 'unidad',
    });
};

export default relations;