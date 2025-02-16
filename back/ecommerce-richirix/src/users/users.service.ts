import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
 
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  

  async getUsers(page: number, limit: number) {
    const users = await this.usersRepository.find();

    const start = (page - 1) * limit;
    const end = start + +limit;

    return users.slice(start, end);
  }

  async getUserById(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  async updateUserById(id: string, user: Partial<User>) {
    const oldUser = await this.usersRepository.findOneBy({ id });
  
    if (!oldUser) {
      return null;
    }
    const updatedUser = { ...oldUser, ...user };
  
    await this.usersRepository.save(updatedUser);
  
    return updatedUser;
  }

  // async createUser(user: Omit<User, 'id'>) {
  //   const newUser = this.usersRepository.create(user);
  //   return await this.usersRepository.save(newUser); 
  // }
  

  async deleteUserById(id: string) {
    return await this.usersRepository.delete(id);
  }
  
}
