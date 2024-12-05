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
  Patch,
  HttpException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
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
  constructor(private readonly taskService: TaskService,
     private readonly userService: UsersService,
    private readonly authService: AuthService) {}

  @Post()
  //@UseGuards(AuthGuard())
  @UseGuards(JwtAuthGuard)
  async createTask(@Body() task: CreateTaskDto, @Req() req): Promise<Task> {
    return this.taskService.create(task, req.user);
  }

  //search and return response by keyword
  @Get('search')
  findByKeyword(@Query() query: ExpressQuery): Promise<Task[]> {
    return this.taskService.findByKeyword(query);
  }

  @Get('user')
  @Roles(Role.User, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAllTaskPerUser(@Req() req): Promise<Task[]> {
    return this.taskService.findAllPerUser({ user: req.user._id });
  }
  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAllTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  @Roles(Role.User, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOneBook(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.User, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateTask(
    @Param('id') id: string,
    @Body() task: UpdateTaskDto,
    @Req() req
  ): Promise<Task> {
    const checkUser = this.userService.findSingleUser({_id: req.user._id} );
    if(!checkUser) throw new HttpException("user not logged in", 404)
    return this.taskService.update(id, task);
  }

  @Patch(':id')
  @Roles(Role.User, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @Roles(Role.User, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
