import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column({name: 'name'})
    name: string;
    
    @Column({ unique: true, name: 'email' })
    email: string;

    @Column({ name: 'password' })
    password: string;
}
