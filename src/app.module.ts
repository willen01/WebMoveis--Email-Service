import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
