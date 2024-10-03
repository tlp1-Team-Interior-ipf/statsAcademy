import { UserModel } from "./user.js";
import { Chat } from "./modelChat.js";
import { EvaInicialModel } from "./evaInicial.js";
import { PreguntasModel } from "./preguntas.js";
import { RespuestasModel } from "./respuestas.js";
import { Programa } from "./programa.js";
import { Unidades } from "./unidades.js";
import { Temas } from "./temas.js";
import { SubTemas } from "./subTema.js";
import { Calificaciones } from "./calificaciones.js";
import { Progreso } from "./progreso.js";

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

    // relacion de uno a muchos con la tabla Evaluación Inicial y la tabla de preguntas
    EvaInicialModel.hasMany(PreguntasModel, {
        foreignKey: 'evaInicialId',
        as: 'preguntas',
    });

    PreguntasModel.belongsTo(EvaInicialModel, {
        foreignKey: 'evaInicialId',
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

    // relacion de uno a muchos con la tabla de Temas y la tabla de SubTemas
    Temas.hasMany(SubTemas, {
        foreignKey: 'temaId',
        as: 'subTemas',
    });

    SubTemas.belongsTo(Temas, {
        foreignKey: 'temaId',
        as: 'tema',
    });

    // relacion uno a uno entre la tabla de Temas y la tabla de Calificaciones
    Temas.hasOne(Calificaciones, {
        foreignKey: 'temaId',
        as: 'calificacion',
    });

    Calificaciones.belongsTo(Temas, {
        foreignKey: 'temaId',
        as: 'tema',
    });

    // relacion uno a uno entre la tabla de Temas y la tabla de Progreso
    Temas.hasOne(Progreso, {
        foreignKey: 'temaId',
        as: 'progreso',
    });

    Progreso.belongsTo(Temas, {
        foreignKey: 'temaId',
        as: 'tema',
    });

    // relacion uno a uno entre la tabla de User y la tabla de Progreso
    UserModel.hasOne(Progreso, {
        foreignKey: 'userId',
        as: 'progreso',
    });

    Progreso.belongsTo(UserModel, {
        foreignKey: 'userId',
        as: 'user',
    });

    // relacion uno a uno entre la tabla de User y la tabla de Evaluacion Inicial
    UserModel.hasOne(EvaInicialModel, {
        foreignKey: 'userId',
        as: 'evaInicial',
    });

    EvaInicialModel.belongsTo(UserModel, {
        foreignKey: 'userId',
        as: 'user',
    });
};

export default relations;