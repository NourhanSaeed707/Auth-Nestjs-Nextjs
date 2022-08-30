import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { response } from 'express';
// import { request } from 'http';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
     async canActivate(context: ExecutionContext): Promise<any> {
        
      //const request = context.switchToHttp().getRequest();
      //const response = context.switchToHttp().getResponse();
      //console.log("req.autheticated: ");
      //if(response.status(401))
      //  console.log("unauthorizeeed..");
      //console.log(response);
      //console.log(context);
      console.log("inside jwt auth-guard")
        return await super.canActivate(context);
      }
     
}
