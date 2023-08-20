import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schema/project.schema';
import { ProjectDto } from './dto/project.dto';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';


@Injectable()
export class ProjectService {
    constructor(@InjectModel(Project.name) private projectModel:Model<Project>,@InjectModel(User.name) private userModel:Model<User>){}

    async addProject(id:string,dto:ProjectDto){
        const {title,description}=dto;
        const project=await this.projectModel.create({
            title,
            description
        });
        const objectId=new mongoose.Types.ObjectId(id);
        const users=project.users;
        users.push(objectId);
        project.users=users;
        await project.save();
        return project;
    }

    async getAllProjects(id:string){
        const projects=await this.projectModel.find();
        const objectId=new mongoose.Types.ObjectId(id);
        const filteredProjects=projects.filter((project)=>{
            const users=project.users;
            if(users.includes(objectId)){
                return project;
            }
        })
        if(!filteredProjects){
            throw new NotFoundException('No project found for this user!')
        }
        return filteredProjects.map((project)=>{
            return {
                id : project._id,
                title:project.title,
                description:project.description,
                users:project.users
            }
        });
    }

    async getProjectById(userId:string,projectId:string){
        const objectUserId=new mongoose.Types.ObjectId(userId);
        const project=await this.projectModel.findOne({_id:projectId,users:{$in:objectUserId}})
        if(!project){
            throw new NotFoundException("This project doesn't exist!");
        }
        // if(!project.users.includes(objectUserId)){
        //     throw new ForbiddenException("This project does not belong to the current user!")
        // }

        return {
            id:project._id,
            title:project.title,
            description:project.description
        };
    }

    async editProject(userId:string,projectId:string ,dto:ProjectDto){
        const {title,description}=dto;
        const objectUserId=new mongoose.Types.ObjectId(userId);
        const updatedProject=await this.projectModel.findOneAndUpdate({_id:projectId,users:{$in:objectUserId}},{title,description},{new:true});
        if(!updatedProject){
            throw new NotFoundException('No project found!')
        }

        return `Project '${projectId}' updated successfully!`
    }

    async addUserToProject(userId:string,projectId:string,newUserName:string){
        const newUser=await this.userModel.findOne({name:newUserName});
        if(!newUser){
            throw new NotFoundException(`No user has ${newUserName} as a name.`)
        }
        const project=await this.projectModel.findOne({_id:projectId,users:{$in:new mongoose.Types.ObjectId(userId)}});
        if(!project){
            throw new NotFoundException('The project you are trying to join is invalid.')
        }
        const users=project.users;
        users.push(new mongoose.Types.ObjectId(newUser._id));
        project.users=users;
        await project.save();
        return project;
    }

    async deleteProject(userId:string,projectId:string){
        const objectUserId=new mongoose.Types.ObjectId(userId);
        const deletedProject = await this.projectModel.findOneAndDelete({_id: projectId,users:{$in:objectUserId}});
        if(!deletedProject){
            throw new NotFoundException('Project not found!')
        }
        return `Project '${projectId}' deleted successfully!`;
    }
}
