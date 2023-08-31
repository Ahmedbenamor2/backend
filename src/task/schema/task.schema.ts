import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document,Types } from "mongoose";
import { ObjectId } from "mongoose";
import { type } from "os";
import { Project } from "src/project/schema/project.schema";

export type TaskDocument=Task & Document;

enum TaskStatus {
    TODO = "To-do",
    IN_PROGRESS = "In progress",
    COMPLETED = "Completed",
  }

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

    @Prop({
        type: String,
        enum: [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED],
        default: TaskStatus.TODO, // You can set a default value if needed
      })
      status: string;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:Project.name})
    projectId: Project;
}

export const taskSchema=SchemaFactory.createForClass(Task);