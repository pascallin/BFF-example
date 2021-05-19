import { Field, ID, ObjectType, Directive } from '@nestjs/graphql';

import { User } from './user.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Todo {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field()
  userId: number;

  @Field((type) => User)
  user?: User;
}
