
import { Equals, IsDate, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class TaskDto{
    @IsNotEmpty()
    @IsString()
    readonly title:string;

    @IsNotEmpty()
    @IsString()
    readonly description:string;

    @IsNotEmpty()
    @Matches(/^\d{4}-\d{2}-\d{2}$/i,{message:'Deadline must have format yyyy-MM-dd'})
    readonly deadline:string; 

    @IsOptional()
    @IsString()
    readonly status:string;
}