import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user';

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    wallet_balance: { type: Number, default: 0.00, required: false },
    user_name: {type: String, required: false},
    password: {type: String, required: false}
});

userSchema.post<IUser>('save', () => {
console.log('user saved');
});

export default mongoose.model<IUser>('users', userSchema);