import { Injectable, NotFoundException } from '@nestjs/common';
import {BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

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

  createBoard(createBoardDto: CreateBoardDto, user: User) : Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async deleteBoard(id : number, user: User) : Promise<void> {
    const result = await this.boardRepository.delete([id, user.id]);// 맞나?
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

  async getAllBoards(
    user : User
  ) : Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder("Board");
    query.where("board.userId = :userId", {userId : user.id});

    const boards = await query.getMany();
    return boards;
  }
}
