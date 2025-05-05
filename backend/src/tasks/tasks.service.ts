import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto, taskToDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasksRepo: Repository<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const task = new Task();
    task.title = createTaskDto.title;
    if (createTaskDto.parentId) {
      task.parent = (await this.tasksRepo.findOneBy({ id: createTaskDto.parentId })) ?? undefined;
    }
    return this.tasksRepo.save(task)
      .then(taskToDto);
  }

  async findAll(): Promise<TaskDto[]> {
    return this.tasksRepo.find({ relations: ['subtasks', 'parent'] })
      .then((tasks: Task[]) => tasks.map(taskToDto));
  }

  async findSubtasks(id: number): Promise<TaskDto[]> {
    return this.tasksRepo.find({
      where: { parent: { id } },
      relations: ['subtasks', 'parent'],
    }).then((tasks: Task[]) => tasks.map(taskToDto));
  }
}