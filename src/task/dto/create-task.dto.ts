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

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsEnum(Status, { message: 'wrong status selected' })
  readonly status: Status;

  @IsEmpty({ message: 'user input not required' })
  readonly user: User;
}
