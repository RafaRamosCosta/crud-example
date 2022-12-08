import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  findAll() {
    const users = this.userModel.find();
    return users;
  }

  findOne(id: string) {
    const user = this.userModel.findById(id);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        updateUserDto,
      },
      {
        new: true,
      },
    );
    return updatedUser;
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
