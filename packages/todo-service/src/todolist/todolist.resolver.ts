import { NotFoundException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { Todo } from './entities/todo.entity';
import { User } from './entities/user.entity';
import { TodoListService } from './todolist.service';
import { NewTodoInput } from './dto/new-todo.input';
import { TodoListArgs } from './dto/todolist.args';

@Resolver((of) => Todo)
export class TodoResolver {
  constructor(private readonly todoListService: TodoListService) {}

  @Query((returns) => Todo)
  async todoItem(@Args('id') id: string): Promise<Todo> {
    const result = await this.todoListService.findOneById(id);
    if (!result) {
      throw new NotFoundException(id);
    }
    return result;
  }

  @Query((returns) => [Todo])
  todolist(@Args() args: TodoListArgs): Promise<Todo[]> {
    return this.todoListService.findAll(args);
  }

  @Mutation((returns) => Todo)
  async addTodoItem(@Args('newTodoData') data: NewTodoInput): Promise<Todo> {
    const result = await this.todoListService.create(data);
    return result;
  }

  @Mutation((returns) => Boolean)
  async removeTodoItem(@Args('id') id: string) {
    return this.todoListService.remove(id);
  }

  @ResolveField((of) => User)
  user(@Parent() todo: Todo): any {
    return { __typename: 'User', id: todo.userId };
  }
}
