import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";



@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login (@Request() req){
        console.log("users:");
        console.log(req.user);
       return this.authService.login(req.user);
    }
}