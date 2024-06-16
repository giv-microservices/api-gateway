import { Controller, Get, Post, Body, Patch, Param, Inject, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto';
import { firstValueFrom } from 'rxjs';
import { OrderPaginationDto, StatusDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDER_SERVICE) private readonly orderClient: ClientProxy,) { }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return firstValueFrom(this.orderClient.send(
        { cmd: 'create_order' },
        createOrderDto,
      ))
    }
    catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.orderClient.send({ cmd: 'find_all_orders' }, orderPaginationDto);
  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {

      return this.orderClient.send({ cmd: 'find_all_orders' }, {
        ...paginationDto,
        status: statusDto.status,
      });

    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.orderClient.send({ cmd: 'find_order_by_id' }, { id })
      );

      return order;

    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      return this.orderClient.send({ cmd: 'update_order_status' }, { id, status: statusDto.status })
    } catch (error) {
      throw new RpcException(error);
    }
  }


}
