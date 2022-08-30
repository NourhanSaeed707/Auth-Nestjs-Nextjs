import { IsEmail, IsNotEmpty,IsInt, IsNumber } from 'class-validator';
export class CreateDepartmentDto {
    @IsNotEmpty({message: "you have to enter department Name"})
    name: string;
}
