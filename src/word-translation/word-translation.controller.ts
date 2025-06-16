import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WordTranslationService } from './word-translation.service';
import { CreateWordTranslationDto } from './dto/create-word-translation.dto';
import { UpdateWordTranslationDto } from './dto/update-word-translation.dto';
import { FirebaseAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('word-translation')
export class WordTranslationController {
  constructor(private readonly wordTranslationService: WordTranslationService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  create(@Body() createWordTranslationDto: CreateWordTranslationDto) {
    return this.wordTranslationService.create(createWordTranslationDto);
  }

  @Get()
  findAll() {
    return this.wordTranslationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordTranslationService.findOne(+id);
  }

  @Patch()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  update(@Body() updateWordTranslationDto: UpdateWordTranslationDto) {
    return this.wordTranslationService.update(updateWordTranslationDto);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.wordTranslationService.remove(+id);
  }
}
