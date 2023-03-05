import UserModel from '@/resources/user/user.model';
import User from '@/resources/user/user.interface';

class UserService {
    private user = UserModel;

    /**
     * Create a new User
     */
    public async create(username: string, password: string): Promise<User> {
        try {
            const user = await this.user.create({ username, password });
            return user;
        } catch (error) {
            throw new Error('Unable to create User');
        }
    }
}

export default UserService;
