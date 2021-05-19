import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TodoListService } from './todolist.service';
import { User } from './entities/user.entity';
import { Todo } from './entities/todo.entity';

@Resolver((of) => User)
export class UsersResolvers {
  constructor(private readonly todoListService: TodoListService) {}

  @ResolveField((of) => [Todo])
  public async todolist(@Parent() user: User): Promise<Todo[]> {
    const result = await this.todoListService.forAuthor(user.id);
    return result;
  }
}
