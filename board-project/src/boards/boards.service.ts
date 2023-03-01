import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {BoardStatus } from './board-status.enum';
import { v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { BoardRepository } from './board.providers';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
  constructor (
    // @Inject('BOARD_REPOSITORY')
    // private boardRepository : Repository<Board>,
    @InjectRepository(BoardRepository)
    private boardRepository : BoardRepository,
  ){}
  //const a = new BoardRepository();
  async getBoardById(id : number) : Promise <Board> {
    const found = await this.boardRepository.findOne({where : {id:id}});
    if (!found){
      throw new NotFoundException(`can't find board with id ${id}`);
    }
    return found;
  }

  async createBoard(createBoardDto: CreateBoardDto) : Promise<Board> {
    const {title, description} = createBoardDto;
    
    const board = this.boardRepository.create({
      title : title,
      description: description,
      status : BoardStatus.PUBLIC,
    })

    await this.boardRepository.save(board);
    return board;
  }
  /*
  getAllBoards() : Board[] {
    return this.boards;
  }

  createBoard(createBoardDto : CreateBoardDto){
    const {title, description} = createBoardDto;
    const board: Board = {
      id : uuid(),
      title : title,
      description : description,
      status : BoardStatus.PUBLIC
    }

    this.boards.push(board);
    return board;
  }

  getBoardById(id : string) : Board{
    const board = this.boards.find((board) => {board.id === id});
    if (!board){
      throw new NotFoundException(`can't find board id : ${id}`);
    }
    return board;
  }

  deleteBoard(id : string) : void {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== found.id);
  }

  updateBoardStatus(id: string, status : BoardStatus) : Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
  */
}
