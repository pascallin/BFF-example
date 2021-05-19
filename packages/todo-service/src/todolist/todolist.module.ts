import { Module } from '@nestjs/common';

import { TodoResolver } from './todolist.resolver';
import { UsersResolvers } from './user.resolver';
import { TodoListService } from './todolist.service';
import { DateScalar } from '../common/date.scalar';

@Module({
  providers: [TodoResolver, UsersResolvers, TodoListService, DateScalar],
})
export class TodoListModule {}
