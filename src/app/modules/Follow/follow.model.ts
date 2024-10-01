import { model, Schema } from "mongoose";
import { IFollower, IFollowing } from "./follow.interface";



const followerSchema = new Schema<IFollower>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

const followingSchema = new Schema<IFollowing>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});





export const Follower = model<IFollower>('Follower', followerSchema);
export const Following = model<IFollowing>('Following', followingSchema);
