import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-vaildation.pipe';
@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService){}

  @Get('/:id')
  getBoardById(@Param('id') id : number) : Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id) : Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id : number,
    @Body('status', BoardStatusValidationPipe) status : BoardStatus
    ) : Promise<Board> {
      return this.boardsService.updateBoardStatus(id, status);
    }
  
  @Get()
  getAllTask() : Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }
}
