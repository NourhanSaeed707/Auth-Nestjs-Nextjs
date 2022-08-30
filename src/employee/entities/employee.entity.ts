import { Department } from 'src/department/entities/department.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, BaseEntity } from 'typeorm';
@Entity()
export class Employee {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;
 
  @Column()
  job_title: string;


  @Column({name: 'department_id'})
  @ManyToOne(() => Department, (department) => department.id)
    department_ : Department
}
