import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { Equipment } from 'src/equipments/equipments.model';
import { EquipmentsModule } from 'src/equipments/equipments.module';

@Module({
  imports: [SequelizeModule.forFeature([Comment, Equipment])],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
