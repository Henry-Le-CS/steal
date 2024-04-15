import { Provider } from "@nestjs/common";
import { OrderService } from "./services/order.service";

export const ORDER_SERVICES = Symbol(`ORDER_SERVICES`);

export const OrderServiceProvider: Provider = {
    provide: ORDER_SERVICES,
    useClass: OrderService,
}