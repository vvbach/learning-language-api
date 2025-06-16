import { IsNumber, IsString } from "class-validator";

export class CreateAudioDto {
  @IsNumber()
  lessonId: number

  @IsNumber()
  languageId: number;

  @IsString()
  audioUrl: string;
}
