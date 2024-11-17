import { UserModel } from "./user.js";
import { Chat } from "./modelChat.js";
import { initialAssessment } from "./initialAssessment.js";
import { Questions } from "./Questions.js";
import { Answer } from "./Answer.js";
import { Program } from "./Program.js";
import { Units } from "./Units.js";
import { Topic } from "./Topic.js";
import { SubTopic } from "./SubTopic.js";
import { Ratings } from "./Ratings.js";
import { Progress } from "./Progress.js";
import { EventModel } from "./event.js";
import { Task } from "./tasks.js";

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
    initialAssessment.hasMany(Questions, {
        foreignKey: 'initialAssessmentId',
        as: 'questions',
    });

    Questions.belongsTo(initialAssessment, {
        foreignKey: 'initialAssessmentId',
        as: 'initialAssessment',
    });

    // relacion de uno a uno con la tabla Preguntas y la tabla de Respuestas
    Questions.hasOne(Answer, {
        foreignKey: 'questionId',
        as: 'answers',
    });

    Answer.belongsTo(Questions, {
        foreignKey: 'questionId',
        as: 'questions',
    });

    // relacion de uno a muchos con la tabla Programa y la tabla de Unidades
    Program.hasMany(Units, {
        foreignKey: 'programId',
        as: 'units',
    });

    Units.belongsTo(Program, {
        foreignKey: 'programId',
        as: 'program',
    });

    // relacion de uno a muchos con la tabla Unidades y la tabla de Temas
    Units.hasMany(Topic, {
        foreignKey: 'unitsId',
        as: 'topics',
    });

    Topic.belongsTo(Units, {
        foreignKey: 'unitsId',
        as: 'units',
    });

    // relacion de uno a muchos con la tabla de Temas y la tabla de SubTemas
    Topic.hasMany(SubTopic, {
        foreignKey: 'topicId',
        as: 'subtopics',
    });

    SubTopic.belongsTo(Topic, {
        foreignKey: 'topicId',
        as: 'topics',
    });

    // relacion uno a uno entre la tabla de Temas y la tabla de Calificaciones
    Topic.hasOne(Ratings, {
        foreignKey: 'topicId',
        as: 'ratings',
    });

    Ratings.belongsTo(Topic, {
        foreignKey: 'topicId',
        as: 'topics',
    });

    // relacion uno a uno entre la tabla de User y la tabla de Progreso
    UserModel.hasOne(Progress, {
        foreignKey: 'userId',
        as: 'progress',
    });

    Progress.belongsTo(UserModel, {
        foreignKey: 'userId',
        as: 'user',
    });

    // relacion uno a uno entre la tabla de User y la tabla de Evaluacion Inicial
    UserModel.hasOne(initialAssessment, {
        foreignKey: 'userId',
        as: 'initialAssessment',
    });

    initialAssessment.belongsTo(UserModel, {
        foreignKey: 'userId',
        as: 'user',
    });

    // relacion de uno a muchos con la tabla User y la tabla Evento
    UserModel.hasMany(EventModel, {
        foreignKey: 'userId',
        as: 'events',
    });

    EventModel.belongsTo(UserModel, {
        foreignKey: 'userId',
        as: 'user',
    });

    // relación de uno a muchos entre la tabla de User y la tabla de Calificaciones
    UserModel.hasMany(Ratings, {
        foreignKey: 'userId',
        as: 'ratings',
    });

    Ratings.belongsTo(UserModel, {
        foreignKey: 'userId',
        as: 'user',
    });


    // relacion de uno a muchos con la tabla User y la tabla de Tareas
    UserModel.hasMany(Task, {
        foreignKey: 'userId',
        as: 'tasks',
    });

    Task.belongsTo(UserModel, {
        foreignKey: 'userId',
        as: 'user',
    });
};

export default relations;