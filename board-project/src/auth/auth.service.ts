import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(UserRepository)
    private userRepository : UserRepository,
    private jwtService : JwtService
  ){}

  async singUp(authCredentialsDto : AuthCredentialsDto) : Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto : AuthCredentialsDto
    ) : Promise<{accessToken : string}> {
      
    const {username , password} = authCredentialsDto;
    const user = await this.userRepository.findOne({where : {username : username}});

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return {accessToken: accessToken};
    } else {
      throw new UnauthorizedException("logIn failed");
    }
  }
}
