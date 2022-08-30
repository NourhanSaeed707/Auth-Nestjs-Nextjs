import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
    // super();
  }

  async validate(email: string, password: string): Promise< User > {
    console.log("validate function");
    const user = await this.authService.validateUser(email, password);
    console.log(user);
    if (!user) {
      //console.log("unauth");
      throw new UnauthorizedException(); // 401
    }
    return user;
  }
}