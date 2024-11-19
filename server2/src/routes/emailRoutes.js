import { Router } from 'express';
import { UserModel } from '../models/user.js';
import { hashPassword } from '../utils/hash.js'
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const emailRoutes = Router();

emailRoutes.post('/request-password-reset', async (req, res) => {
    const { email } = req.body;
    console.log("lo recibido:", email)

    const user = await UserModel.findOne({ where: {email} });
    console.log("aqui esta el email:", user)
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    try {
        const recoveryToken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

        const isProduction = process.env.NODE_ENV === 'development'; // 'production' para cuando se despliega 'development' cuando es local

        const sitio = isProduction ? 'https://tu-sitio.com' : 'http://localhost:5173/changepass'

        const recoveryLink = `${sitio}?token=${recoveryToken}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
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

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Enlace de recuperación enviado a tu correo electrónico.' });
    } catch (err) {
        console.error('Error al generar el token:', err);
        res.status(500).json({ message: 'Hubo un error al procesar tu solicitud. Intenta nuevamente.' });
    }
});

emailRoutes.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { email } = decoded;
    
    const user = await UserModel.findOne({ where: { email } });


    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({
          message: 'La contraseña debe tener al menos 8 caracteres',
      });
  }
  
    user.password = await hashPassword(newPassword);

    const password = user.password
    
    await user.save();

    res.status(200).json({ message: 'Contraseña actualizada con éxito', password });
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(400).json({ message: 'Token inválido o expirado' });
  }
});

export default emailRoutes;
