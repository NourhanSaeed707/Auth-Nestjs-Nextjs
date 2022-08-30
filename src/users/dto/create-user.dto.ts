import { IsEmail, IsNotEmpty } from "class-validator";
export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty({message: "you have to enter your email"})
    email: string;

    @IsNotEmpty({message: "you have to enter your name"})
    name: string;

    @IsNotEmpty({message: "you have to enter your password"})
    password: string;
}
