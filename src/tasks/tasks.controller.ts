import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  Post,
  Put,
  Delete,
  ParseIntPipe
} from '@nestjs/common';
import { get } from 'http';
import { CreateTaskDTO } from './dto/task-dto';
import { UpdateTaskDTO } from './dto/task-dto';

@Controller('tasks')
export class TasksController {
  @Get()
  findAll(): string {
    return 'Hello from done';
  }

  @Get('/:id')
  findOne(@Param('id',ParseIntPipe) id:number): string {
    return 'Hello from done' + id;
  }

  @Post()
  create(@Body() data: CreateTaskDTO) {
    console.log(data)
    return data;
  }
  @Put()
  update(@Body() data: UpdateTaskDTO) {
    return data;
  }

  @Delete()
  delete(@Body() data: any) {
    return data;
  }
}
