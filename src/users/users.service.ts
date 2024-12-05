import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel:Model<User>
  ) {}

  findAllUsers() {
    return this.userModel.find();
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
