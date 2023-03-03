import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(UserRepository)
    private userRepository : UserRepository
  ){}

  async singUp(authCredentialsDto : AuthCredentialsDto) : Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }
}
