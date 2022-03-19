import { Router }  from 'express';
import { loginUser } from './auth.http';

export const authRouter = Router();

authRouter.route('/login')
.post(loginUser)
