import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LanguageService {

  constructor(
    private prisma: PrismaClient,
  ) {}

  async create(createLanguageDto: CreateLanguageDto) {
    return await this.prisma.language.create({
      data: createLanguageDto
    })
  }

  async findAll() {
    return await this.prisma.language.findMany()
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    return await this.prisma.language.update({
      where: { id },
      data: updateLanguageDto,
    })
  }

  async remove(id: number) {
    return this.prisma.course.delete({ where: { id } });
  }
}
