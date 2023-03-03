import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";

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
    const user = this.create({username, password});

    await this.save(user);
  }
}