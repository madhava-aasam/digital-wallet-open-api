import { NextFunction, Request, Response } from 'express';
import User from '../models/model.user';

const validateUserCredentials = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    console.log('req.body', req.body)

    if (!username || !password) {
        return res.status(401).json({
            message: 'no users found'
        });
    }

    const user = await User.findOne({ user_name: username, password: password }).exec();
    // console.log('user --------------', user);

    if (user) {
        return res.status(200).json({
            user
        });
    } else {
        return res.status(500).json({
            message: 'no users found'
        });
    }
};

export default { validateUserCredentials} ;