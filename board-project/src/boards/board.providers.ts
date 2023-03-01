import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Board } from "./board.entity";

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(
        @InjectRepository(Board)
        private readonly repository: Repository<Board>
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
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