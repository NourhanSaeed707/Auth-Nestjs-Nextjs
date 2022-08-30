import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') { 
    //session part
    // async canActivate(context: ExecutionContext) {
    //     const result = ( await super.canActivate(context)) as boolean;
    //     const request = context.switchToHttp().getRequest();
    //     console.log("request context: "); console.log(request);
    //     await super.logIn(request);
    //     return result;
    // }  
}