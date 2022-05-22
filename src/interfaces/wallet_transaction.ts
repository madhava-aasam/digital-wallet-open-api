import { Document } from 'mongoose';

export default interface IWalletTransaction extends Document {
    senderId: string;
    recipientId: string;
    amount: number;
    notes: string;
    is_archived: boolean;
}
