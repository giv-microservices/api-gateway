import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { OrdersModule } from './orders/orders.module';
import { NastModule } from './transports/nast.module';

@Module({
  imports: [ProductModule, OrdersModule, NastModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
