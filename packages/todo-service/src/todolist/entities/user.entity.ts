import { Directive, ObjectType, Field, ID } from '@nestjs/graphql';
import { Todo } from './todo.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field((type) => ID)
  @Directive('@external')
  id: number;

  @Field((type) => [Todo])
  todolist?: Todo[];
}
