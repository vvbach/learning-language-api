import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateAudioDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  audioUrl?: string;
}