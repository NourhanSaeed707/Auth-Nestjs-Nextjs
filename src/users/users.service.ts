import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
   ){}
  
   async create(createUserDto: CreateUserDto) {
    //hashed password before save it in database.
    const password = await encodePassword( createUserDto.password);
    let newUser =  await this.usersRepository.create({...createUserDto, password});
    return await this.usersRepository.save(newUser);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string) {
    try{
      let found = await this.usersRepository.findOne( 
       {
         where : {
           email: email
         }} 
       ); 
      return found;
   }
   catch(err){
      throw new InternalServerErrorException(err);
   }
  }
  async getUserByEmail(email: string): Promise<User>{
    try{
      let found = await this.usersRepository.findOne({
       where:{
         email: email
       }
      });
      return found;
   }
   catch(err){
     throw new InternalServerErrorException(err);
   }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
