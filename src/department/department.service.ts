import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    // @InjectRepository(EmployeeRepository) private employeeRepository: EmployeeRepository,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
   ){}
  private departments: Department [] = [];
  async create(createDepartmentDto: CreateDepartmentDto) {
    let { ...data} = createDepartmentDto;
    await this.departmentRepository.save({
      ...data
    });
  }

  async findAll(): Promise<Department[]> {
    // return this.departments;
    return await this.departmentRepository.find();
  }

  async findOne(id: number):Promise<Department> {
      try{
        let found = await this.departmentRepository.findOne (  {
          where : {
            id: id
          }} 
         );
         if(!found) throw new NotFoundException('Department not found, please enter correct ID');
       return found;
      }
      catch(err){
        throw new InternalServerErrorException(err);
      }
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    try{
      let found = await this.departmentRepository.findOne({
        where:{
          id: id
        }
      })
      if(!found) throw new NotFoundException('Department not found, please enter correct ID');
      else
        return await this.departmentRepository.update(id,updateDepartmentDto);
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async remove(id: number) {
    try{
      let found = await this.departmentRepository.findOne({
        where:{
          id: id
        }
      })
      if(!found) throw new NotFoundException('Department not found, please enter correct ID');
      else
        return await this.departmentRepository.delete(id);
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }
}
