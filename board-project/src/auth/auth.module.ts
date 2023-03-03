import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
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
  imports : [
    PassportModule.register({defaultStrategy : "jwt"}),
    JwtModule.register({
      secret : "Secret1234",
      signOptions :{
        expiresIn: 60 * 60,
      }
    }),
    TypeOrmModule.forFeature([User])
  ]
})
export class AuthModule {}
