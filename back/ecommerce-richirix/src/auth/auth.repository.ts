import { Injectable } from '@nestjs/common';

export interface Logged {
  email: string;
  password: string;
}

@Injectable()
export class UsersRepository {
  private readonly users: Logged[] = [
    { email: 'test1@example.com', password: 'Password123!' },
    { email: 'test2@example.com', password: 'mypassword' },
  ];

  getUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
