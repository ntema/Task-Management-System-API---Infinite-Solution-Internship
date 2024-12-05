import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { TaskSchema } from './schemas/task.schema';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/auth/schema/user.schema';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { 
        name: 'Task', 
        schema: TaskSchema 
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService,],
})
export class TaskModule {}
