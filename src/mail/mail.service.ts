import { Injectable } from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer"
import { SendEmailProtocol } from './protocols/send-mail-protocol';

@Injectable()
export class MailService {
    constructor(private readonly mailserService: MailerService){}

    //realiza o envio de email
    async sendEmail(config: SendEmailProtocol){
        await this.mailserService.sendMail({
            to: config.to,
            subject: config.subject,
            html:  config.html
        })
    }
}
