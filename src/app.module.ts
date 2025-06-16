import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AudioModule } from './audio/audio.module';
import { WordTranslationModule } from './word-translation/word-translation.module';
import { SentenceTranslationModule } from './sentence-translation/sentence-translation.module';
import { SentenceModule } from './sentence/sentence.module';
import { LessonModule } from './lesson/lesson.module';
import { LanguageModule } from './language/language.module';
import { CourseModule } from './course/course.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { WordTranslationMapModule } from './word-translation-map/word-translation-map.module';

@Module({
  imports: [
    AuthModule,  
    LanguageModule, 
    CourseModule,
    LessonModule, 
    SentenceModule, 
    SentenceTranslationModule, 
    WordTranslationModule, 
    WordTranslationMapModule, 
    AudioModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 20,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule { }
