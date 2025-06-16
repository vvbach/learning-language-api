import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SentenceTranslationService } from './sentence-translation.service';
import { CreateSentenceTranslationDto } from './dto/create-sentence-translation.dto';
import { UpdateSentenceTranslationDto } from './dto/update-sentence-translation.dto';
import { FirebaseAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('sentence-translation')
export class SentenceTranslationController {
  constructor(private readonly sentenceTranslationService: SentenceTranslationService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  create(@Body() createSentenceTranslationDto: CreateSentenceTranslationDto) {
    return this.sentenceTranslationService.create(createSentenceTranslationDto);
  }

  @Get()
  findAll() {
    return this.sentenceTranslationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sentenceTranslationService.findOne(+id);
  }

  @Patch()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  update(@Body() updateSentenceTranslationDto: UpdateSentenceTranslationDto) {
    return this.sentenceTranslationService.update(updateSentenceTranslationDto);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.sentenceTranslationService.remove(+id);
  }
}
