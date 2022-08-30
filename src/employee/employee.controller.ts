import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  InternalServerErrorException,
  NotFoundException,
  ParseIntPipe,
  Res,
  HttpStatus,
  DefaultValuePipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Department } from 'src/department/entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { Employee } from './entities/employee.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,

    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    // private readonly departmentRepository: Repository<Department>,

    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  //find all
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit: number = 2,
    @Request() req,
  ): Promise<Pagination<Employee>> {
    console.log('user request: ');
    console.log(req.user);
    limit = limit > 100 ? 100 : limit;
    return this.employeeService.paginate({
      page,
      limit,
      // return this.employeeService.findAll();
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.employeeService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @Res() res: Response,
  ) {
    try {
      let found = await this.employeeService.findOne(id);
      if (!found)
        res.status(HttpStatus.BAD_REQUEST).json(['Employee not found']);
      else {
        const f = await this.employeeService.update(id, updateEmployeeDto);
        console.log(f);
        return res
          .status(HttpStatus.OK)
          .json([await this.employeeService.findOne(id)]);
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
    // return this.employeeService.update(+id, updateEmployeeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    try {
      let found = await this.employeeService.findOne(id);
      if (!found)
        res.status(HttpStatus.BAD_REQUEST).json(['Employee not found']);
      else {
        const f = await this.employeeService.remove(id);
        return res
          .status(HttpStatus.OK)
          .json(['Employee deleted successfully']);
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
