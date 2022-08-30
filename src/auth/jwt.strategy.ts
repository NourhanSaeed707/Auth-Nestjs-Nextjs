import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtSecret } from './constants';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService, private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // this tell that we want auth token from header of request
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(validationPayload: { email: string, sub: string}): Promise<User | null>{
     console.log("validate function"); 
     const user = await this.userService.findOne(validationPayload.email);
     if(!user){
     // console.log("authorizeeeeeeeeed.......");
      throw new Error('Unable to get user from decoded token.');
     }
     return user;

  }
}