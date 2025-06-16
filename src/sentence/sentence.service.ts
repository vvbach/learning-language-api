import { Injectable } from '@nestjs/common';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { UpdateSentenceDto } from './dto/update-sentence.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SentenceService {

  constructor(private prisma: PrismaClient) { }

  async create(createDto: CreateSentenceDto) {
    return await this.prisma.sentence.create({
      data: {
        lesson: {
          connect: { id: createDto.lessonId }
        },
        content: createDto.content,
        translations: {
          create: createDto.translations.map(t => ({
            languageId: t.languageId,
            translation: t.translation,
            audioURL: t.audioUrl,
          })),
        },
        wordTranslations: {
          create: createDto.wordTranslations.map(wt => ({
            sourceWord: wt.sourceWord,
            translations: {
              create: wt.translations.map(wtm => ({
                languageId: wtm.languageId,
                translatedWord: wtm.translatedWord,
              })),
            },
          })),
        },
      },
      include: {
        translations: true,
        wordTranslations: {
          include: {
            translations: true,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.sentence.findMany({
      include: {
        translations: true,
        wordTranslations: {
          include: {
            translations: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.sentence.findUnique({
      where: { id },
      include: {
        translations: true,
        wordTranslations: {
          include: {
            translations: true,
          },
        },
      },
    });
  }

  async update(updateDto: UpdateSentenceDto) {
    return await this.prisma.sentence.update({
      where: { id: updateDto.id },
      data: {
        content: updateDto.content,
      },
      include: {
        translations: true,
        wordTranslations: {
          include: {
            translations: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.sentence.delete({
      where: { id },
    });
  }
}
