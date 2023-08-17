import { ForbiddenException, Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService:JwtService ,
    ){}
    
    async signUp(signUpDto: SignUpDto){
        const {name,email,password} = signUpDto;
        const hashed= await bcrypt.hash(password,10);
        const user= await this.userModel.create({
            name,
            email,
            password: hashed
        });
        const token=this.jwtService.sign({userId : user._id},)
        return token;
        //return {name,email,hashed};
    }

    async login(loginDto:LoginDto){
        const {email , password}=loginDto;
        const user=await this.userModel.findOne({ email });
        if(!user) throw new ForbiddenException('invalid email or password!')
        const isPasswordsMatched= await bcrypt.compare(password,user.password);

        if(!isPasswordsMatched) throw new ForbiddenException('invalid email or password!')

        const token=this.jwtService.sign({userId : user._id})
        return token;
    }

    async getUser(userId:string){
        const user=await this.userModel.findOne({_id:userId});
        if(!user){
            throw new NotFoundException(`Can't find a user with id ${userId}`);
        }
        return user;
    }

}
