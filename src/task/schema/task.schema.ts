import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import * as mongoose from "mongoose";
import { Document,Types } from "mongoose";
import { ObjectId } from "mongoose";
import { Project } from "src/project/schema/project.schema";

export type TaskDocument=Task & Document;

@Schema({
    timestamps:true,
})
export class Task{
    @Prop()
    title:string;

    @Prop()
    description:string;

    @Prop()
    deadline:Date; 
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:Project.name})
    projectId: Project;
}

export const taskSchema=SchemaFactory.createForClass(Task);