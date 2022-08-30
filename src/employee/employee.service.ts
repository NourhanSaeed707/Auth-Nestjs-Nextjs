import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsPhoneNumber } from 'class-validator';
import { throwError } from 'rxjs';
import { Department } from '../department/entities/department.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeRepository } from './employee.repository';
import { Employee } from './entities/employee.entity';
import { Response } from 'express';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class EmployeeService {
 constructor(
  @InjectRepository(Employee)
  private readonly employeeRepository: Repository<Employee>,
 
 @InjectRepository(Department)
  private readonly departmentRepository: Repository<Department>
 ){}
 
async paginate(options: IPaginationOptions): Promise<Pagination<Employee>> {
  return paginate<Employee>(this.employeeRepository, options,  {relations:['department_']} );
}
  async create(createEmployeeDto: CreateEmployeeDto) {
    let {department_id , ...data} = createEmployeeDto;
   // console.log("creeeeeate:  " + createEmployeeDto);
    const isExists = await this.departmentRepository.findOne(
      {
        where: {
        id: department_id
      }});
    if(!isExists) throw new NotFoundException('Department not found');
   await this.employeeRepository.save( {
    ...data,
    department_: isExists
   });
  }
    //return all employees
  async findAll(): Promise<Employee[]> {
  
       return await this.employeeRepository.find({
        relations: {
            department_: true,
        },
    })
  }
  //return one employee
  async findOne(id: number): Promise<Employee> { 
    try{
       let found = await this.employeeRepository.findOne( 
        {
          where : {
            id: id
          }} 
        ); 
       return found;
    }
    catch(err){
       throw new InternalServerErrorException(err);
    }
  }
  // update employee
  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try{
      // let found = await this.employeeRepository.findOne({
      //   where: {
      //     id: id
      //   }
      // });
      // if(!found)  res.status(HttpStatus.BAD_REQUEST).json(["Employee not found"]);
       return await this.employeeRepository.update(id, updateEmployeeDto);
    }
   catch(err){
     throw new InternalServerErrorException(err);
    }
  }
  async remove(id: number) {
    try{
      let found = await this.employeeRepository.findOne(
        {
          where: {
          id: id
        }});
      console.log(found);
      if(!found) throw new BadRequestException('Employee not found, please enter correct ID');
      else
        return await this.employeeRepository.delete(found);
    }
    catch(err){
      console.log("errrrrr");
      throw new InternalServerErrorException(err);
    }
  }
}
