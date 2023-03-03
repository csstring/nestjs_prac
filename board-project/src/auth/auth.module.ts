import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
  ],
  imports : [TypeOrmModule.forFeature([User])]
})
export class AuthModule {}
