import { Injectable } from '@nestjs/common';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  findById(id: number): User {
    return {
      id,
      name: 'tester',
    };
  }
}
