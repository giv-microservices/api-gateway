import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICE, env } from 'src/config';


@Module({
  controllers: [ProductsController],
  imports: [
    // microservices configuration
    // in this way, we can register for this module and connect to the microservice
    // for good practice set the name, host, por of the service as a constant,
    // but you can use a string directly
    // if you don't use constants an joi for validation, you can use  env variable directly but with registerAsync
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: env.productsMicroserviceHost,
          port: env.productsMicroservicePort
        }
      },

    ]),
  ]
})
export class ProductModule { }
