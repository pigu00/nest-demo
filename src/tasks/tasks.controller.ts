import { Controller, Get, Param, Query } from '@nestjs/common';
import { get } from 'http';

@Controller('tasks')
export class TasksController {
  @Get('/done')
  done(@Query() params: any): string {
    console.log(params);
    return 'Hello from done';
  }

  @Get('/:id')
  sayHello(@Param('id') id: string): string {
    return 'Hello ' + id;
  }
}
