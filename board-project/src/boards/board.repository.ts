import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(
      @InjectRepository(Board)
      private readonly repository: Repository<Board>
    ) {
      super(repository.target, repository.manager, repository.queryRunner);
    }

  async createBoard(
    createBoardDto : CreateBoardDto,
    user : User
    ) : Promise<Board> {
    const {title, description} = createBoardDto;
  
    const board = this.create({
      title : title,
      description: description,
      status : BoardStatus.PUBLIC,
      user,
    })

    await this.save(board);
    return board;
  }
}