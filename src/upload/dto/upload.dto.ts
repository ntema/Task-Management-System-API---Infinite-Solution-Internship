import { IsOptional, IsString } from "class-validator";

export class CreateFieDto {
    @IsOptional()
    @IsString()
    description?: string;
}