import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { OrdersModule } from './orders/orders.module';
import { NastModule } from './transports/nast.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductModule, OrdersModule, NastModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
