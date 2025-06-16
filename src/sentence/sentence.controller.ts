import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SentenceService } from './sentence.service';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { UpdateSentenceDto } from './dto/update-sentence.dto';
import { FirebaseAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('sentence')
export class SentenceController {
  constructor(private readonly sentenceService: SentenceService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  create(@Body() createSentenceDto: CreateSentenceDto) {
    return this.sentenceService.create(createSentenceDto);
  }

  @Get()
  findAll() {
    return this.sentenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sentenceService.findOne(+id);
  }

  @Patch()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  update(@Body() updateSentenceDto: UpdateSentenceDto) {
    return this.sentenceService.update(updateSentenceDto);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.sentenceService.remove(+id);
  }
}
