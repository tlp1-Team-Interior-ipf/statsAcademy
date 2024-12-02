import { FetchModelResponse } from "../services/chatService.js";

export const socketHandler = (socket, io) => {
    console.log('Socket connected:', socket.id);
    
    socket.on('sendMenssage', async (data) => {
        console.log('Message:', data.message);
        const response = await FetchModelResponse(data.message, data.userId);
        console.log('Response:', response);
        for (let i = 0; i < response.length; i++) {
            io.to(socket.id).emit('receiveMessage', response.slice(0, i));
            await new Promise((res) => setTimeout(res, 50)); // 50ms entre caracteres
        };
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
    });
};