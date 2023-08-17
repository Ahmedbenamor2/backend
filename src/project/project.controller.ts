import { Body, Controller, Get, Param, Patch, Post,Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './dto/project.dto';

@Controller('project')
export class ProjectController {
    constructor(private projectService:ProjectService){}

    @Post(':userId/add')
    addProject(@Param('userId') userId ,@Body() projectDto:ProjectDto){
        return this.projectService.addProject(userId,projectDto);
    }

    @Get(':userId/get')
    getProjectsByUserId(@Param('userId') userId ){
        return this.projectService.getAllProjects(userId);
    }

    @Get(':userId/:projectId/get')
    getProjectByIdAndUserid(@Param("userId") userId, @Param("projectId") projectId){
        return this.projectService.getProjectById(userId,projectId);
    }

    @Patch(':userId/:projectId/edit')
    editProject(@Param('userId') userId ,@Param('projectId') projectId, @Body() updateDto:ProjectDto){
        return this.projectService.editProject(userId,projectId,updateDto)
    }

    @Patch(':userId/:projectId/addUser')
    addUserToProject(@Param('userId') userId,@Param('projectId') projectId,@Body('username') newUserName : string){
        return this.projectService.addUserToProject(userId,projectId,newUserName);
    }

    @Delete(':userId/:projectId/delete')
    deletePrject(@Param('userId') userId,@Param('projectId') projectId){
        return this.projectService.deleteProject(userId,projectId);
    }
}
