import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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

  async createBoard(createBoardDto : CreateBoardDto) : Promise<Board> {
    const {title, description} = createBoardDto;
  
    const board = this.create({
      title : title,
      description: description,
      status : BoardStatus.PUBLIC,
    })

    await this.save(board);
    return board;
  }
   // 원하는 메서드 알아서 작성
}
/*
import { DataSource } from 'typeorm';
import { Board } from './board.entity';

export const boardProviders = [
  {
    provide: 'BOARD_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Board),
    inject: ['DATA_SOURCE'],
  },
];*/