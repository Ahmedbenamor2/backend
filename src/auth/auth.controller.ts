import { Controller, Post,Body,Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @Post('/signup')
    signUp(@Body() signUpDto:SignUpDto){
        return this.authService.signUp(signUpDto);
    }

    @Post('/login')
    logIn(@Body() loginDto:LoginDto){
        return this.authService.login(loginDto);
    }

    @Get(':userId/get')
    getUser(@Param('userId') userId:string){
        return this.authService.getUser(userId);
    }
}
