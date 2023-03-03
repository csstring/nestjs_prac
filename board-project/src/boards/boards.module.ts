import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  controllers: [BoardsController],
  providers: [
    BoardsService,
    BoardRepository
  ],
  imports: [
    TypeOrmModule.forFeature([Board]),
    AuthModule,
  ]
})
export class BoardsModule {}
