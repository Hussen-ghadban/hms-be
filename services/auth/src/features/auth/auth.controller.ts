// src/controllers/auth.ts
import { Request, Response } from 'express';
import { AuthService } from './auth.service';


const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password, hotelId } = req.body;
        const token = await authService.login(email, password, hotelId);
        res.status(200).json({ accessToken: token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// export const addUser = async (req: Request, res: Response) => {
//     try {
//         const { email, password, hotelId } = req.body;
//         const user = await authService.addUser(email, password, hotelId);
//         res.status(201).json(user);
//     } catch (error) {
//         console.error('Add user error:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

export const authenticate = async (req: Request, res: Response) => {
    try {
        const { token,permissions } = req.body;
        const result = await authService.authenticate(token,permissions);
        if (!result) {
            res.status(401).json({ error: 'Unauthorized' });
        }
        res.status(200).json(result);
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message);
        }
        throw new Error("An unexpected error occurred");
    }
}