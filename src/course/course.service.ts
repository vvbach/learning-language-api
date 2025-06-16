import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CourseService {

  constructor(private prisma: PrismaClient) { }

  async create(dto: CreateCourseDto) {
    return this.prisma.course.create({ data: dto });
  }

  async findAll() {
    return this.prisma.course.findMany({
      include: { lesson: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
      include: { lesson: true },
    });
  }

  async update(id: number, dto: UpdateCourseDto) {
    return this.prisma.course.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.course.delete({ where: { id } });
  }
}
