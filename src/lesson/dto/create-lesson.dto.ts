import { Type } from "class-transformer"
import { IsNumber, IsString, ValidateNested } from "class-validator"
import { CreateAudioDto } from "src/audio/dto/create-audio.dto"
import { CreateSentenceDto } from "src/sentence/dto/create-sentence.dto"

export class CreateLessonDto {
    @IsString()
    title: string

    @IsNumber()
    courseId: number

    @ValidateNested({ each: true })
    @Type(() => CreateSentenceDto)
    sentences: CreateSentenceDto[]

    @ValidateNested({ each: true })
    @Type(() => CreateAudioDto)
    lessonAudios: CreateAudioDto[]
}
