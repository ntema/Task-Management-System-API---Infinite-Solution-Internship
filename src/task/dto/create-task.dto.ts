import { User } from 'src/auth/schema/user.schema';
import { Status } from '../schemas/task.schema';
import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'your preferred title' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'your preferred description' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'your preferred status' })
  @IsOptional()
  @IsEnum(Status, { message: 'wrong status selected' })
  readonly status: Status;

  @IsEmpty({ message: 'user input not required' })
  readonly user: User;
}
