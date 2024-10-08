import jwt from 'jsonwebtoken';
import { environments } from '../config/environments.js';


export const generateToken = ( payload ) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, environments.SECRET_KEY, { expiresIn: '24h' }, (err, token) => {
            err ? reject(err) : resolve(token);
        });
    });
};