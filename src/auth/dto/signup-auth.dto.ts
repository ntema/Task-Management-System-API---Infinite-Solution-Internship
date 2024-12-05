import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    readonly username:string

    // @IsNotEmpty()
    // @IsEmail({}, {message:"email is invalid"})
    // readonly email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string

    @IsOptional()
    readonly role: string
}
