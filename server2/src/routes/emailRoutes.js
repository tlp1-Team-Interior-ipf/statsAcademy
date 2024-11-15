import { Router } from 'express';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.js';

const emailRoutes = Router();

emailRoutes.post('/request-password-reset', async (req, res) => {
    const { email } = req.body;
    console.log("lo recibido:", email)

    // Verifica si el correo electrónico existe en la base de datos
    const user = await UserModel.findOne({ where: {email} });
    console.log("aqui esta el email:", user)
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    try {
        // Generar un token de recuperación
        const recoveryToken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Crear el enlace de recuperación con el token
        const recoveryLink = `https://tu-sitio.com/reset-password?token=${recoveryToken}`;

        // Aquí puedes enviar el correo con el enlace de recuperación al usuario
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Cambia el proveedor de correo según lo que uses
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Recuperación de Contraseña',
            text: `Hola, hemos recibido una solicitud de cambio de contraseña. Por favor, haz clic en el siguiente enlace para restablecerla:\n\n${recoveryLink}`,
        };

        // Enviar el correo electrónico
        await transporter.sendMail(mailOptions);

        // Responder al cliente
        res.status(200).json({ message: 'Enlace de recuperación enviado a tu correo electrónico.' });
    } catch (err) {
        console.error('Error al generar el token:', err);
        res.status(500).json({ message: 'Hubo un error al procesar tu solicitud. Intenta nuevamente.' });
    }
});


// Ruta para restablecer la contraseña
emailRoutes.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verificar el token de recuperación
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded; // El correo electrónico del usuario decodificado

    // Buscar el usuario en la base de datos
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Aquí puedes agregar validaciones adicionales para la nueva contraseña (por ejemplo, longitud, fuerza, etc.)
    
    // Actualizar la contraseña del usuario
    user.password = newPassword; // Asegúrate de encriptar la nueva contraseña antes de guardarla
    await user.save();

    res.status(200).json({ message: 'Contraseña actualizada con éxito' });
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(400).json({ message: 'Token inválido o expirado' });
  }
});

export default emailRoutes;
