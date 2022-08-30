import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { jwtSecret } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { SessionSerialzer } from './session.serializer';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '60s' }
    }),
    // PassportModule.register({ session: true })
  ],
  // if you want to use session and this to providers ( SessionSerialzer )
  providers: [AuthService, LocalStrategy, JwtStrategy] ,
  exports: [AuthService]
})
export class AuthModule {}
