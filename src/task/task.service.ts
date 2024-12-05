import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { title } from 'process';
import { User } from '../auth/schema/user.schema';

@Injectable()
export class TaskService {
  /**
   *
   */
  constructor(
    @InjectModel(Task.name)
    private taskModel: mongoose.Model<Task>,
  ) {}

  async create(task: Task, user: User): Promise<Task> {
    const data = Object.assign(task, { user: user._id });
    const res = await this.taskModel.create(data);
    return res;
  }

  async update(id: string, task: Task) {
    return await this.taskModel.findByIdAndUpdate(id, task, {
      new: true,
      runValidators: true,
    });
  }

  async findAllPerUser( _id: any): Promise<Task[]> {
    const tasks = await this.taskModel.find(_id);
    return tasks;
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskModel.find();
    return tasks;
  }

  //find by keyword

  async findByKeyword(query: Query): Promise<Task[]> {
    const resPerPage = 5;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const tasks = await this.taskModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return tasks;
  }

  async findOne(id: string): Promise<Task> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('invalid id');
    }
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async remove(id: string): Promise<Task> {
    return await this.taskModel.findByIdAndDelete(id);
  }
}
