import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';

import { TodoListModule } from './todolist/todolist.module';
import { User } from './todolist/entities/user.entity';

@Module({
  imports: [
    TodoListModule,
    GraphQLFederationModule.forRoot({
      cors: true,
      debug: true,
      playground: true,
      autoSchemaFile: 'schema.gql',
      buildSchemaOptions: {
        orphanedTypes: [User],
      },
    }),
  ],
})
export class AppModule {}
