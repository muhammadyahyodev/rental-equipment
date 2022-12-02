import { HttpException, HttpStatus } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('NestJS TEST')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addTag('NodeJS, NestJS, Postgres, sequilize')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    // SwaggerModule.setup('/api/docs', app, document);
    SwaggerModule.setup('/', app, document);

    await app.listen(PORT, () => {
      console.log(`\nServer has been started on ${PORT} port...`);
    });
  } catch (error) {
    throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
start();
