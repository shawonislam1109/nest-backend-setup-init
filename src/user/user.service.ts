import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDoc } from './schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { CreateAuthDto } from 'src/auth/dto/auth-dto';
import { Auth } from 'src/auth/schema/auth.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDoc>) {}

  async create(createUser: CreateAuthDto): Promise<Auth> {
    const hashedPassword = await bcrypt.hash(createUser.password, 10); // Hash the password
    const newUser = new this.userModel({
      ...createUser,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async findByEmail(email: string): Promise<Auth> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(userId: string): Promise<User> {
    return this.userModel.findById(userId).exec();
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
