import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";

@Schema({
    timestamps:true,
})
export class Project{
    @Prop()
    title:string;

    @Prop()
    description:string;

    @Prop({type:[mongoose.Types.ObjectId], of:User})
    users: mongoose.Types.ObjectId[];
}

export const projectSchema=SchemaFactory.createForClass(Project);