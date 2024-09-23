import { UserModel } from "./user.js";
import { Chat } from "./modelChat.js";

const relations = () => {
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
};

export default relations;