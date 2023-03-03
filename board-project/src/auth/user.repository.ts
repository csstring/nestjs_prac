import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor (
    @InjectRepository(User)
    private readonly repository : Repository<User>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createUser(
    authCredentialsDto : AuthCredentialsDto 
  ) : Promise<void> {
    const {username, password} = authCredentialsDto;
    const salt = await bcrypt.getSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = this.create({username, password : hashedPassword});
    try {
      await this.save(user);
    } catch (error) {
        if (error.code === "23505") {
          throw new ConflictException("Existing username");
        }
        else {
          throw new InternalServerErrorException();
        }
    }
  }
}