import { Body, Controller, Get, Post, Request, UseGuards  } from '@nestjs/common';
import { get } from 'http';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private authService: AuthService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() body, @Request() req) {
    //console.log("request login");
    //console.log(req);
        //  return req.user;
       // window.localStorage.getItem(accessTokenKey);
        return this.authService.login(body); // TODO: return JWT access token 
  }

  @Post('/validate-token')
  validateToken(@Body() body: any) {
    return this.authService.verify(body.access_token);
  }
 
}
