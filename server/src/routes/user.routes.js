import { Router } from 'express';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { 
    ctrlCreateUser, 
ctrlDeleteUser, 
ctrlGetAllUsers, 
ctrlGetUser, 
ctrlUpdateUser,
ctrlLoginUser,
ctrlGetUserByToken,
} from '../controllers/userController.js';
import { createUserSchema, loginUserSchema } from '../models/Schema/userSchema.js';
import { validator } from '../middlewares/validator.js';

const userRouter = Router();


// Ruta para iniciar sesión
userRouter.post('/login', loginUserSchema, ctrlLoginUser);

// Ruta para obtener todos los usuarios (requiere autenticación)
userRouter.get('/', ctrlGetAllUsers);

// Ruta para obtener un usuario por ID (requiere autenticación)
userRouter.get('/:id', authenticateUser, ctrlGetUser);

// Ruta para crear un nuevo usuario
userRouter.post('/', createUserSchema, validator, ctrlCreateUser);

// Ruta para actualizar un usuario existente por ID (requiere autenticación)
userRouter.put('/:id', authenticateUser, ctrlUpdateUser);

// Ruta para eliminar un usuario por ID (requiere autenticación)
userRouter.delete('/:id', authenticateUser, ctrlDeleteUser);

// Ruta para obtener un usuario utilizando el token de autenticación
userRouter.get('/userByToken', authenticateUser, ctrlGetUserByToken);



export default userRouter;