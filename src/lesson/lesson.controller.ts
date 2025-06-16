import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query, Put, Res, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { FirebaseAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('lesson')
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
  ) { }

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @Get(':id')
  async getLessonDetails(
    @Param('id', ParseIntPipe) id: number,
    @Query('language') languageCode: string
  ) {
    return await this.lessonService.get(id, languageCode);
  }

  @Get()
  async getAllLessonDetails(@Query('language') languageCode: string) {
    return await this.lessonService.getAll(languageCode);
  }

  @Put(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  async updateLesson(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return await this.lessonService.update(id, updateLessonDto);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  async deleteLesson(@Param('id', ParseIntPipe) id: number) {
    return await this.lessonService.delete(id);
  }
}
