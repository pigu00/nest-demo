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
  HttpCode
} from '@nestjs/common';
import { get } from 'http';
import { CreateTaskDTO } from './dto/task-dto';
import { UpdateTaskDTO } from './dto/task-dto';
import { TaskEntity } from './entity/task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TaskService) {}

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
