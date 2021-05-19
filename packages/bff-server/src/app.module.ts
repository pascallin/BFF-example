import { Module } from '@nestjs/common';
import {
  GATEWAY_BUILD_SERVICE,
  GraphQLGatewayModule,
  GatewayModuleOptions,
} from '@nestjs/graphql';
import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { decode } from 'jsonwebtoken';

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    if (context.jwt) {
      const { userId } = await decode(context.jwt);
      request.http.headers.set('x-user-id', userId);
    }
  }
}

@Module({
  providers: [
    {
      provide: AuthenticatedDataSource,
      useValue: AuthenticatedDataSource,
    },
    {
      provide: GATEWAY_BUILD_SERVICE,
      useFactory: (AuthenticatedDataSource) => {
        return ({ name, url }) => new AuthenticatedDataSource({ url });
      },
      inject: [AuthenticatedDataSource],
    },
  ],
  exports: [GATEWAY_BUILD_SERVICE],
})
class BuildServiceModule {}

const gatewayOptions: GatewayModuleOptions = {
  gateway: {
    serviceList: [
      /* services */
      { name: 'todo', url: 'http://localhost:4001/graphql' },
      { name: 'user', url: 'http://localhost:4002/graphql' },
    ],
    serviceHealthCheck: true,
    experimental_pollInterval: 1000,
  },
  server: {
    cors: true,
    context: ({ req }) => ({
      jwt: req.headers.authorization,
    }),
  },
};

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => gatewayOptions,
      imports: [BuildServiceModule],
      inject: [GATEWAY_BUILD_SERVICE],
    }),
  ],
})
export class AppModule {}
