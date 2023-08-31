import { Controller,Post,Body,Get, Param, Patch, Delete, HttpCode } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';
import { BadRequestException } from '@nestjs/common/exceptions';


@Controller('task')
export class TaskController {
    constructor(private taskService:TaskService){}

    @Post(':projectId/add')
    addTask(@Body() taskDto:TaskDto,@Param('projectId') projectId:string){
        if (taskDto.status && !this.taskService.isValidStatus(taskDto.status)) {
            throw new BadRequestException("Invalid status value. Must be one of 'To-do', 'In progress', or 'Completed'","INVALID_STATUS_VALUE");
        }
        return this.taskService.addTask(projectId,taskDto);
    }

    @Get(':projectId/get')
    findAllTasks(@Param('projectId') projectId:string){
        return this.taskService.findAll(projectId);
    }

    @Get(':projectId/:taskId/get')
    find(@Param('projectId') projectId:string,@Param('taskId') taskId:string){
        return this.taskService.findTask(projectId,taskId);
    }

    @Patch(':projectId/:taskId/edit')
    edit(@Param('projectId') projectId:string,@Param('taskId') taskId:string,@Body() taskDto:TaskDto){
        return this.taskService.edit(projectId,taskId,taskDto);
    }

    @Delete(':projectId/:taskId/delete')
    deleteTask(@Param('projectId') projectId:string, @Param('taskId') taskId:string){
        return this.taskService.delete(projectId,taskId);
    }
}
