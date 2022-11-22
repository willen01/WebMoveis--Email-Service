import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //configuração do broker message
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: process.env.KAFKA_BROKER.split(','),
        clientId: process.env.KAFKA_CLIENT_ID,
        ssl: true,
        sasl: {
          mechanism: 'scram-sha-256',
          password: process.env.KAFKA_PASSWORD,
          username: process.env.KAFKA_USERNAME
        }
      }
    }
  })

  //inicializando microsserviços
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
