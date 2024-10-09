import { kMaxLength } from 'buffer';
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String, 
        required: true,
        maxlength: [280, 'Text cannot exceed 280 characters']
    },
    img: {
        type: String,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            text: {
                type: String,
                required: true
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        }
    ]
}, {timestamps: true});

const Post = mongoose.model("Post", postSchema);

export default Post;
