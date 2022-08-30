import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EmployeeModule,DepartmentModule, TypeOrmModule.forRoot(typeOrmConfig),UsersModule, AuthModule],
  controllers: [AppController],
  // providers: [AppService, AuthService],
  providers: [AppService],
})
export class AppModule {}
