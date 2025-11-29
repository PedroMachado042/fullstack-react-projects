import { User } from "../models/user.model.js";

export const getAllUsers = async(req,res) => {
    try {
        const currentUserId = req.auth.userId;
        const users = await User.find({clerkId: {$ne: currentUserId}}); //get all but current user
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}