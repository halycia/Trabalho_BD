import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { User } from './user.entity';
export declare class UserService {
    private db;
    constructor(db: DatabaseService);
    findUserByEmail(email: string): Promise<User | null>;
    findUserByUsername(username: string): Promise<User | null>;
    createUser(novoUsuario: CreateUserDto): Promise<User>;
    findAllUsers(): Promise<User[]>;
    updateUser(email: string, updates: UpdateUserDto): Promise<any>;
    deleteUser(email: string): Promise<{
        deletedUser: any;
    }>;
}
