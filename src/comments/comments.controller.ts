import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentsDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentsDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @Get()
  getAll() {
    return this.commentService.getAllComment();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.commentService.getOneComment(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.updateComment(id, updateCommentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    console.log(id);
    return this.commentService.deleteComment(id);
  }
}
