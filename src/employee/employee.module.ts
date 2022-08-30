import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepository } from './employee.repository';
import { Employee } from './entities/employee.entity';
import { DepartmentService } from 'src/department/department.service';
import { Department } from 'src/department/entities/department.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [EmployeeController],
  imports: [TypeOrmModule.forFeature([Employee, Department])],
  providers: [EmployeeService, JwtService],
  
})
export class EmployeeModule {}
