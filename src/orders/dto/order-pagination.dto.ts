import { IsEnum, IsOptional } from 'class-validator';

import { OrderStatus, OrderStatusList } from '../enum/order.enum';
import { PaginationDto } from 'src/common/dto';


export class OrderPaginationDto extends PaginationDto {


  // To validate the status query parameter, we use the IsEnum decorator from the class-validator package.
  @IsOptional()
  @IsEnum( OrderStatusList, {
    message: `Valid status are ${ OrderStatusList }`
  })
  status: OrderStatus;


}