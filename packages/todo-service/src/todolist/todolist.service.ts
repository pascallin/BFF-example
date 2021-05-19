import { Injectable } from '@nestjs/common';
import * as R from 'ramda';

import { Todo } from './entities/todo.entity';
import { NewTodoInput } from './dto/new-todo.input';
import { TodoListArgs } from './dto/todolist.args';

let todoList: Todo[] = [];

@Injectable()
export class TodoListService {
  async create(data: NewTodoInput): Promise<Todo> {
    const newData: Todo = {
      id: (todoList.length + 1).toString(),
      userId: data.userId,
      title: data.title,
      description: data.description,
      creationDate: new Date(),
    };
    todoList = R.append(newData, todoList);
    return newData;
  }

  async findOneById(id: string): Promise<Todo> {
    return R.find(R.propEq('id', id))(todoList) as Todo;
  }

  async findAll(args: TodoListArgs): Promise<Todo[]> {
    return R.slice(args.skip, args.skip + args.take, todoList);
  }

  async remove(id: string): Promise<boolean> {
    const index = R.findIndex(R.propEq('id', id))(todoList);
    if (index > -1) {
      R.drop(index, todoList);
      return true;
    }
    return false;
  }

  async forAuthor(userId: number): Promise<Todo[]> {
    return R.filter((todo: Todo) => todo.userId == userId, todoList);
  }
}
