import { UpdateSentenceDto } from 'src/sentence/dto/update-sentence.dto';
import { UpdateAudioDto } from 'src/audio/dto/update-audio.dto';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateLessonDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  courseId: number

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateSentenceDto)
  sentences?: UpdateSentenceDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateAudioDto)
  lessonAudios?: UpdateAudioDto[];
}

