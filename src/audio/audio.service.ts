import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAudioDto } from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AudioService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(createDto: CreateAudioDto) {
    return this.prisma.lessonAudio.create({
      data: {
        lessonId: createDto.lessonId,
        languageId: createDto.languageId,
        audioUrl: createDto.audioUrl,
      },
    });
  }

  async findAll() {
    return this.prisma.lessonAudio.findMany({
      include: {
        lesson: true,
        language: {
          select: {
            code: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const audio = await this.prisma.lessonAudio.findUnique({
      where: { id },
      include: {
        lesson: true,
        language: {
          select: {
            code: true,
          },
        },
      },
    });

    if (!audio) {
      throw new NotFoundException(`LessonAudio with ID ${id} not found`);
    }

    return audio;
  }

  async update(updateDto: UpdateAudioDto) {
    await this.findOne(updateDto.id);

    return this.prisma.lessonAudio.update({
      where: { id: updateDto.id },
      data: {
        audioUrl: updateDto.audioUrl,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.lessonAudio.delete({
      where: { id },
    });
  }
}
