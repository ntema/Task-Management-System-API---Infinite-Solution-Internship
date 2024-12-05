import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { RolesGuard } from 'src/auth/guard/role.guard';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  //@UseGuards(AuthGuard())
  @UseGuards(JwtAuthGuard)
  async createTask(@Body() task:CreateTaskDto, @Req() req): Promise<Task> {
    return this.taskService.create(task, req.user);
  }

  @Put(':id')
  updateTask(
    @Param('id') id: string,
    @Body() task: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.update(id, task);
  }

  //search and return response by keyword
  @Get('search')
  findByKeyword(@Query() query: ExpressQuery): Promise<Task[]> {
    return this.taskService.findByKeyword(query);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAllTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOneBook(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.taskService.update(id, updateBookDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
