import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentsDto } from './dtos/create-comment.dto';
import { Comment } from './comments.model';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { Equipment } from 'src/equipments/equipments.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private readonly commentRepository: typeof Comment,
    @InjectModel(Equipment)
    private readonly equipmentRepository: typeof Equipment,
  ) {}

  async createComment(createCommentDto: CreateCommentsDto) {
    const equipment = await this.equipmentRepository.findOne({
      where: { id: createCommentDto.equipment_id },
    });
    const comment = await this.commentRepository.create(createCommentDto);
    if (!comment) {
      throw new HttpException('Comment no created', HttpStatus.BAD_REQUEST);
    }

    equipment.total_rating += comment.rating;
    await equipment.save();
    return comment;
  }

  async getAllComment() {
    const comments = await this.commentRepository.findAll({
      include: { all: true },
    });
    return comments;
  }

  async getOneComment(id: number) {
    const comment = await this.commentRepository.findByPk(id, {
      include: { all: true },
    });
    if (!comment) {
      throw new HttpException(
        'Comment with this ID not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return comment;
  }

  async updateComment(id: number, commentData: UpdateCommentDto) {
    const comment = await this.commentRepository.update(commentData, {
      where: { id },
      returning: true,
    });

    if (!comment) {
      throw new HttpException(
        'Comment with this ID not updated',
        HttpStatus.BAD_REQUEST,
      );
    }
    return comment[0][1];
  }

  async deleteComment(id: number) {
    const comment = await this.commentRepository.destroy({ where: { id } });
    if (!comment) {
      throw new HttpException(
        'Comment with this ID not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return comment;
  }
}
