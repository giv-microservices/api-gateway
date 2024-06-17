import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { NastModule } from 'src/transports/nast.module';


@Module({
  controllers: [ProductsController],
  imports: [NastModule]
})
export class ProductModule { }
