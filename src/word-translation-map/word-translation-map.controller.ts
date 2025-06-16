import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WordTranslationMapService } from './word-translation-map.service';
import { CreateWordTranslationMapDto } from './dto/create-word-translation-map.dto';
import { UpdateWordTranslationMapDto } from './dto/update-word-translation-map.dto';
import { FirebaseAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('word-translation-map')
export class WordTranslationMapController {
  constructor(private readonly wordTranslationMapService: WordTranslationMapService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  create(@Body() createWordTranslationMapDto: CreateWordTranslationMapDto) {
    return this.wordTranslationMapService.create(createWordTranslationMapDto);
  }

  @Get()
  findAll() {
    return this.wordTranslationMapService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordTranslationMapService.findOne(+id);
  }

  @Patch()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  update(@Body() updateWordTranslationMapDto: UpdateWordTranslationMapDto) {
    return this.wordTranslationMapService.update(updateWordTranslationMapDto);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.wordTranslationMapService.remove(+id);
  }
}
