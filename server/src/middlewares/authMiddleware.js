import jwt from 'jsonwebtoken';

export const authenticateUser = async (req, res, next) => {
    console.log("middleware ejecutado")

    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { user: userId } = jwt.verify(token, process.env.SECRET_KEY);

        req.userId = userId; // Adjuntamos el ID del usuario al objeto de solicitud para que esté disponible en los controladores
        next(); // Continuar con la siguiente función en la cadena de middleware
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};