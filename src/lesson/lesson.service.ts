import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Prisma, PrismaClient } from '@prisma/client';
import { LessonResponseDto } from './dto/lesson-response.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { audit } from 'rxjs';

@Injectable()
export class LessonService {

  constructor(private prisma: PrismaClient) { }

  async create(createLessonDto: CreateLessonDto) {
    return await this.prisma.lesson.create({
      data: {
        title: createLessonDto.title,
        course: {
          connect: { id: createLessonDto.courseId },
        },
        sentences: {
          create: createLessonDto.sentences.map(sentence => ({
            content: sentence.content,
            translations: {
              create: sentence.translations.map(t => ({
                languageId: t.languageId,
                translation: t.translation,
                audioUrl: t.audioUrl,
              })),
            },
            wordTranslations: {
              create: sentence.wordTranslations.map(wt => ({
                sourceWord: wt.sourceWord,
                translations: {
                  create: wt.translations.map(wtm => ({
                    languageId: wtm.languageId,
                    translatedWord: wtm.translatedWord,
                  })),
                },
              })),
            },
          })),
        },
        lessonAudios: {
          create: createLessonDto.lessonAudios?.map(audio => ({
            languageId: audio.languageId,
            audioUrl: audio.audioUrl,
          })) ?? [],
        },
      },
      include: {
        sentences: {
          include: {
            translations: true,
            wordTranslations: {
              include: {
                translations: true,
              },
            },
          },
        },
        lessonAudios: true,
      },
    });
  }


  async get(id: number, languageCode: string): Promise<LessonResponseDto> {
    const language = await this.prisma.language.findUnique({
      where: { code: languageCode },
    });

    if (!language) {
      throw new NotFoundException(`Language with code '${languageCode}' not found`);
    }

    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        sentences: {
          include: {
            translations: {
              where: { languageId: language.id },
            },
            wordTranslations: {
              include: {
                translations: {
                  where: { languageId: language.id },
                },
              },
            },
          },
        },
        lessonAudios: {
          where: { languageId: language.id }
        }
      },
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    return {
      id: lesson.id,
      title: lesson.title,
      sentences: lesson.sentences.map(sentence => ({
        id: sentence.id,
        content: sentence.content,
        translations: sentence.translations.map(t => ({
          id: t.id,
          translation: t.translation,
          audioUrl: t.audioUrl,
        })),
        wordTranslations: sentence.wordTranslations.map(wt => ({
          id: wt.id,
          sourceWord: wt.sourceWord,
          translations: wt.translations.map(wtm => ({
            id: wtm.id,
            translatedWord: wtm.translatedWord,
          })),
        })),
      })),
      lessonAudio: lesson.lessonAudios.map(audio => ({
        audioUrl: audio.audioUrl
      }))
    };
  }

  async getAll(languageCode: string): Promise<LessonResponseDto[]> {

    const language = await this.prisma.language.findUnique({
      where: { code: languageCode },
    });

    if (!language) {
      throw new NotFoundException(`Language with code '${languageCode}' not found`);
    }

    const lessons = await this.prisma.lesson.findMany({
      include: {
        sentences: {
          include: {
            translations: {
              where: { languageId: language.id },
            },
            wordTranslations: {
              include: {
                translations: {
                  where: { languageId: language.id },
                },
              },
            },
          },
        },
        lessonAudios: {
          include: {
            language: true,
          },
          where: { languageId: language.id }
        }
      },
    });

    return lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      sentences: lesson.sentences.map((sentence) => ({
        id: sentence.id,
        content: sentence.content,
        translations: sentence.translations.map((t) => ({
          id: t.id,
          translation: t.translation,
          audioUrl: t.audioUrl,
        })),
        wordTranslations: sentence.wordTranslations.map((wt) => ({
          id: wt.id,
          sourceWord: wt.sourceWord,
          translations: wt.translations.map((wtm) => ({
            id: wtm.id,
            translatedWord: wtm.translatedWord,
          })),
        })),
      })),
      lessonAudio: lesson.lessonAudios.map(audio => ({
        audioUrl: audio.audioUrl
      }))
    }));
  }


  async update(id: number, dto: UpdateLessonDto) {
    return this.prisma.$transaction(async (tx) => {
      const lesson = await tx.lesson.update({
        where: { id },
        data: {
          title: dto.title,
        },
      });

      if (dto.lessonAudios) {
        for (const audioDto of dto.lessonAudios) {
          await tx.lessonAudio.update({
            where: { id: audioDto.id },
            data: {
              audioUrl: audioDto.audioUrl,
            },
          });
        }
      }

      if (dto.sentences) {
        for (const sentenceDto of dto.sentences) {
          await tx.sentence.update({
            where: { id: sentenceDto.id },
            data: {
              content: sentenceDto.content,
            },
          });

          if (sentenceDto.translations) {
            for (const tr of sentenceDto.translations) {
              await tx.sentenceTranslation.update({
                where: { id: tr.id },
                data: {
                  translation: tr.translation,
                  audioUrl: tr.audioUrl,
                },
              });
            }
          }

          if (sentenceDto.wordTranslations) {
            for (const wt of sentenceDto.wordTranslations) {
              await tx.wordTranslation.update({
                where: { id: wt.id },
                data: { sourceWord: wt.sourceWord },
              });

              if (wt.translations) {
                for (const map of wt.translations) {
                  await tx.wordTranslationMap.update({
                    where: { id: map.id },
                    data: { translatedWord: map.translatedWord },
                  });
                }
              }
            }
          }
        }
      }

      return lesson;
    });
  }


  async delete(id: number): Promise<void> {
    await this.prisma.lesson.delete({
      where: { id },
    });
  }
}


