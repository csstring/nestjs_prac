import { Injectable, NotFoundException } from '@nestjs/common';
import {BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
  constructor (
    @InjectRepository(BoardRepository)
    private boardRepository : BoardRepository,
  ){}

  async getBoardById(id : number) : Promise <Board> {
    const found = await this.boardRepository.findOne({where : {id:id}});
    if (!found){
      throw new NotFoundException(`can't find board with id ${id}`);
    }
    return found;
  }

  createBoard(createBoardDto: CreateBoardDto) : Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  async deleteBoard(id : number) : Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0){
      throw new NotFoundException(`can't find Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status : BoardStatus) : Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }

  async getAllBoards() : Promise<Board[]> {
    return this.boardRepository.find();
  }
}
