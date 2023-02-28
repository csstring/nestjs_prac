import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { stat } from 'fs';
@Injectable()
export class BoardsService {
  private boards : Board[] = [];

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
  
}
