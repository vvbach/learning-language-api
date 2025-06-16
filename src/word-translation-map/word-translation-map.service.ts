import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWordTranslationMapDto } from './dto/create-word-translation-map.dto';
import { UpdateWordTranslationMapDto } from './dto/update-word-translation-map.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class WordTranslationMapService {
   constructor(private readonly prisma: PrismaClient) {}

  async create(createDto: CreateWordTranslationMapDto) {
    return this.prisma.wordTranslationMap.create({
      data: {
        wordTranslationId: createDto.wordTranslationId,
        languageId: createDto.languageId,
        translatedWord: createDto.translatedWord,
      },
    });
  }

  async findAll() {
    return this.prisma.wordTranslationMap.findMany({
      include: {
        wordTranslation: {
          select: {
            sourceWord: true
          }
        },
        language: {
          select: {
            code: true
          }
        },
      },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.wordTranslationMap.findUnique({
      where: { id },
      include: {
        language: true,
        wordTranslation: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`WordTranslationMap with id ${id} not found`);
    }

    return record;
  }

  async update(updateDto: UpdateWordTranslationMapDto) {
    await this.findOne(updateDto.id);

    return this.prisma.wordTranslationMap.update({
      where: { id: updateDto.id },
      data: {
        translatedWord: updateDto.translatedWord,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.wordTranslationMap.delete({
      where: { id },
    });
  }
}
