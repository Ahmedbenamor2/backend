import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { taskSchema } from './schema/task.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, UserSchema } from 'src/auth/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: taskSchema },{name:User.name,schema:UserSchema}])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
