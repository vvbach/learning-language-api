import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSentenceTranslationDto } from './dto/create-sentence-translation.dto';
import { UpdateSentenceTranslationDto } from './dto/update-sentence-translation.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SentenceTranslationService {
  constructor(private readonly prisma: PrismaClient) { }

  async create(createDto: CreateSentenceTranslationDto) {
    return this.prisma.sentenceTranslation.create({
      data: {
        sentenceId: createDto.sentenceId,
        languageId: createDto.languageId,
        translation: createDto.translation,
        audioUrl: createDto.audioUrl,
      },
    });
  }

  async findAll() {
    return this.prisma.sentenceTranslation.findMany({
      include: {
        sentence: true,
        language: true,
      },
    });
  }

  async findOne(id: number) {
    const translation = await this.prisma.sentenceTranslation.findUnique({
      where: { id },
      include: {
        sentence: true,
        language: true,
      },
    });
    if (!translation) throw new NotFoundException(`Translation #${id} not found`);
    return translation;
  }

  async update(updateDto: UpdateSentenceTranslationDto) {
    return this.prisma.sentenceTranslation.update({
      where: { id: updateDto.id },
      data: {
        translation: updateDto.translation,
        audioUrl: updateDto.audioUrl,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.sentenceTranslation.delete({
      where: { id },
    });
  }
}
