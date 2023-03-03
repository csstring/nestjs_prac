import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
  imports: [TypeOrmModule.forFeature([Board])]
})
export class BoardsModule {}
