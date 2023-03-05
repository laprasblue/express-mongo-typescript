import User from '@/resources/user/user.interface';
import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export default model<User>('User', UserSchema);
