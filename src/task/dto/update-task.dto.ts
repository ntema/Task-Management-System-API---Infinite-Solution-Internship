import { User } from 'src/auth/schema/user.schema';
import { Status } from '../schemas/task.schema';
import {
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  isEmpty,
  isEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ description: 'your preferred title' })
  @IsOptional()
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'your preferred decription' })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'your preferred title' })
  @IsOptional()
  @IsEnum(Status, { message: 'wrong status selected' })
  readonly status: Status;

  @IsEmpty({ message: 'user input not required' })
  readonly user: User;
}
