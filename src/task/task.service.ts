import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schema/task.schema';
import  { Model } from 'mongoose';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
  private readonly validStatusValues = ["To-do", "In progress", "Completed"];

    isValidStatus(status: string): boolean {
        return this.validStatusValues.includes(status);
    }
  async addTask(id: string, taskDto: TaskDto) {
    const { title, description, deadline, status } = taskDto;
    const task = await this.taskModel.create({
      title,
      description,
      deadline:new Date(deadline),
      status:status,
      projectId: id,
    });
    return task;
  }

  async findAll(id: string) {
    const tasksByUserId = await this.taskModel.find({ projectId: id });
    if(!tasksByUserId || tasksByUserId.length===0){
      throw new NotFoundException('No Tasks Found');
    }
    return tasksByUserId.map((task) => {
      return {
        id: task._id,
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        status:task.status
      };
    });
  }

  async findTask(projectId: string, taskId: string) {
    const task = await this.taskModel.findOne({ _id: taskId, projectId: projectId });
    return {
      id: task._id,
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      status:task.status
    };
  }

  async edit(projectId:string, taskId:string ,taskDto:TaskDto){
    const {title,description,deadline,status}=taskDto
    const taskToUpdate=await this.taskModel.findOneAndUpdate({_id:taskId},{title,description,deadline:new Date(deadline),status},{new:true});
    
    if(!taskToUpdate) throw new NotFoundException('No such a task to update!')
    
    
    return `Task '${taskToUpdate._id}' updated successfully!`;
  }

  async delete(projectId:string, taskId:string){
    const taskToDelete=await this.taskModel.findOneAndDelete({_id:taskId});
    if(!taskToDelete) throw new NotFoundException('No such a task to delete!');
    return 'Task deleted!'
  }
}
