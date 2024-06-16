import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [ProductModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
