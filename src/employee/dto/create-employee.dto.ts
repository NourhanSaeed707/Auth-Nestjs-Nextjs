import { Type } from "class-transformer";
import { IsNotEmpty,IsEmail,IsInt, IsNumber } from "class-validator";
import { Department } from "src/department/entities/department.entity";

export class CreateEmployeeDto {
   
    @IsNotEmpty({message: "you have to enter your name"})
    name: string;

    @IsEmail()
    @IsNotEmpty({message: "you have to enter your email"})
    email: string;

    @IsNotEmpty({message: "you have to enter your phone"})
    phone: string;
    @IsNotEmpty({message: "you have to enter your job title"})
    job_title: string;

    @IsNotEmpty({message: "you have to enter your Department id"})
    @IsNumber()
    department_id: number;
}
