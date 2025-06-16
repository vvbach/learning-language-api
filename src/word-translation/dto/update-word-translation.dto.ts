import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { UpdateWordTranslationMapDto } from "src/word-translation-map/dto/update-word-translation-map.dto";

export class UpdateWordTranslationDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  sourceWord?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateWordTranslationMapDto)
  translations?: UpdateWordTranslationMapDto[];
}
