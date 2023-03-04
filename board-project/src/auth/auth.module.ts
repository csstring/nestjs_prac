import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as config from "config";

const jwtConfig = config.get("jwt");

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    JwtStrategy,
  ],
  imports : [
    PassportModule.register({defaultStrategy : "jwt"}),
    JwtModule.register({
      secret : jwtConfig.secret,
      signOptions :{
        expiresIn: jwtConfig.expiresIn,
      }
    }),
    TypeOrmModule.forFeature([User])
  ],
  exports : [
    JwtStrategy,
    PassportModule,
  ]
})
export class AuthModule {}
