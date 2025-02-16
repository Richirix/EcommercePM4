import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepositoty: Repository<User>,
    private jwtService: JwtService,
  ) {}
 
  async signup(user: Partial<User>) {

    const foundUser = await this.usersRepositoty.findOneBy({
      email: user.email,
    });

    if (foundUser) {
      throw new BadRequestException('user already registred')
    }
    
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = { ...user, password: hashedPassword };

    const savedUser = await this.usersRepositoty.save(newUser);

    return savedUser
  }


  async signIn(email: string, password: string) {
    const user = await this.usersRepositoty.findOneBy({ email: email });

    if (!user) {
      throw new NotFoundException('Invalid Credentials');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new NotFoundException('Invalid Credentials');
    }
    
    const payload ={
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin
    }

    const token = this.jwtService.sign(payload);

    return { 
      token,
      message: 'User Logged In ',
    }
  }
}
