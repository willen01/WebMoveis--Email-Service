import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly emailService: MailService) {}

  //pega a mensagem que está chegando do broker
  @MessagePattern('3g9m5dqs-messages-notification')
  async consumeEmailMessage(@Payload() KafkaMessage) {
    const { Username, destination, subject, message } = KafkaMessage;

    for (const email of destination) {
      // DESAFIO - realiza o envio do email personalizado. A forma de personalizar foi enviando um email com nome do Usuário
      await this.emailService.sendEmail({
        to: email,
        subject: subject,
        html: `Olá ${Username}, ${message}`,
      });
    }
  }
}
