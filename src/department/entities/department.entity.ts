import { Employee } from 'src/employee/entities/employee.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true}) 
  name: string;

  // @OneToMany(() => Employee, (employee) => employee.department_)
  //  employee : number ;
}
