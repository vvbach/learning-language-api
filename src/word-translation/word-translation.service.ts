import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWordTranslationDto } from './dto/create-word-translation.dto';
import { UpdateWordTranslationDto } from './dto/update-word-translation.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class WordTranslationService {
  constructor(private readonly prisma: PrismaClient) { }

  async create(createDto: CreateWordTranslationDto) {
    return this.prisma.wordTranslation.create({
      data: {
        sentenceId: createDto.sentenceId,
        sourceWord: createDto.sourceWord,
        translations: {
          create: createDto.translations.map(t => ({
            languageId: t.languageId,
            translatedWord: t.translatedWord,
          })),
        },
      },
      include: {
        translations: true,
      },
    });
  }

  async findAll() {
    return this.prisma.wordTranslation.findMany({
      include: {
        translations: true,
      },
    });
  }

  async findOne(id: number) {
    const word = await this.prisma.wordTranslation.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });
    if (!word) throw new NotFoundException(`WordTranslation #${id} not found`);
    return word;
  }

  async update(updateDto: UpdateWordTranslationDto) {
    return this.prisma.wordTranslation.update({
      where: { id: updateDto.id },
      data: {
        sourceWord: updateDto.sourceWord,
      },
    });
  }


  async remove(id: number) {
    return this.prisma.wordTranslation.delete({
      where: { id },
    });
  }
}
