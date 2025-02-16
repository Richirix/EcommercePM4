import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  country?: string;
  city?: string;
}

@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'password123',
      address: '123 Main St',
      phone: '123-456-7890',
      country: 'USA',
      city: 'New York',
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: 'mypassword',
      address: '456 Elm St',
      phone: '987-654-3210',
      country: 'Canada',
      city: 'Toronto',
    },
  ];

  async getUsers(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + +limit;

    const users = this.users.slice(start, end)

    return users;
  }
  async getById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  async createUser(user: Omit<User, 'id'>) {
    const id = this.users.length + 1;
    this.users = [...this.users, { id, ...user }];
    return { id, ...user };
  }

  async updateById(id: number, user: User) {
    const oldUSer = this.users.find((user) => user.id === id);

    if (!oldUSer) return null;

    const updateById = { ...oldUSer, ...user };

    const index = this.users.findIndex((user) => user.id === id);

    this.users[index] = updateById;
    return updateById;
  }

  deleteById(id: number) {
    const index = this.users.findIndex((user) => user.id === id);

    this.users.splice(index, 1);

    return this.users;
  }

}
