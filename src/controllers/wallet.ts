import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Transaction from '../models/model.wallet_transaction';
import User from '../models/model.user';

const getWalletUsers = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    let users;

    if (userId) {
        users = await User.find({ _id: userId }).exec();
    } else {
        users = await User.find().exec();
    }

    if (!users) {
        return res.status(500).json({
            message: 'no users found'
        });
    }

    return res.status(200).json({
        users,
        count: users.length
    });
};

const createWalletTransaction = async (req: Request, res: Response, next: NextFunction) => {
    let { senderId, recipientId, amount, notes, is_archived } = req.body;

    try {
        const transaction = new Transaction({
            _id: new mongoose.Types.ObjectId(),
            senderId,
            recipientId,
            amount,
            notes,
            is_archived
        });

        const trxn = await transaction.save();

        // update sender account balance
        const sender = await User.findOne({ _id: senderId }).exec();
        if (sender) {
            const updatedBal = sender.wallet_balance ? sender.wallet_balance - amount : amount;
            await User.updateOne({ _id: senderId }, { wallet_balance: updatedBal }, { returnOriginal: true }).exec();
        }

        // update recipient account balance
        const recipient = await User.findOne({ _id: recipientId }).exec();
        if (recipient) {
            const updatedBal = recipient.wallet_balance + amount;
            await User.updateOne({ _id: recipientId }, { wallet_balance: updatedBal }, { returnOriginal: true }).exec();
        }

        const trxnInfo = await Transaction.find({_id: trxn._id}).populate({ path: 'recipientId senderId', select: ['name'] })
        .select('amount notes');

        return res.status(201).json({
            transaction: trxnInfo
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
};

const getAllWalletTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;

        const filter = { $or: [{ senderId: userId }, { recipientId: userId }] };
        let trxns;

        if (userId) {
            trxns = await Transaction.find(filter)
                .populate({ path: 'recipientId senderId', select: ['name'] })
                .select('amount notes createdAt');
        } else {
            trxns = await Transaction.find()
                .populate({ path: 'recipientId senderId', select: ['name'] })
                .select('amount notes createdAt');
        }

        return res.status(200).json({
            transactions: trxns,
            count: trxns.length
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
};

export default { getWalletUsers, createWalletTransaction, getAllWalletTransactions };
