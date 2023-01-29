import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  Post,
  Put,
  Delete,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  Inject
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { get } from 'http';
import { CreateTaskDTO } from './dto/task-dto';
import { UpdateTaskDTO } from './dto/task-dto';

import { TaskEntity } from './entity/task.entity';
import { TaskService } from './task.service';
import config from '../config';
import { ConfigType } from '@nestjs/config';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TaskService, 
    @Inject(config.KEY) private configService: ConfigType<typeof config>) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    
    return {
      success: true,
      task: this.taskService.findAll()
    };
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number): TaskEntity {
    return this.taskService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateTaskDTO) {
    this.taskService.create(data);
    return {
      success: true, 
      message: 'Task created successfully'
    }
  }
  @Put('/:id')
  update(@Param('id',ParseIntPipe) id: number, @Body() data: UpdateTaskDTO) {
    return this.taskService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.delete(id);
  }
}
