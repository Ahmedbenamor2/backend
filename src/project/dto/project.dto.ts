import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";

export class ProjectDto{
    @IsNotEmpty()
    @IsString()
    readonly title:string;
    
    @IsNotEmpty()
    @IsString()
    readonly description:string;
}