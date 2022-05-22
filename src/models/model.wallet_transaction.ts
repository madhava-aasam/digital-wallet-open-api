import mongoose, { Schema } from 'mongoose';
import IWalletTransaction from '../interfaces/wallet_transaction';

const walletTransactionSchema: Schema = new Schema(
    {
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        recipientId: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        amount: { type: Number, required: true },
        notes: { type: String, default: '', required: false },
        created_on: { type: Date, default: Date.now, required: false },
        is_archived: { type: Boolean, default: false, required: false }
    }
);

walletTransactionSchema.post<IWalletTransaction>('save', function () {
    console.info('wallet transaction is saved: ', this);
});

export default mongoose.model<IWalletTransaction>('wallet_transactions', walletTransactionSchema);
