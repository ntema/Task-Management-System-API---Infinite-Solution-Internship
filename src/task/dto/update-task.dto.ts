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

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsEnum(Status, { message: 'wrong status selected' })
  readonly status: Status;

  @IsEmpty({ message: 'user input not required' })
  readonly user: User;
}
