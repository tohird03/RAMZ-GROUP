import { IClientsInfo } from "@/api/clients";
import { IPayment } from "@/api/types";

export interface IOrderPayment {
  client?: IClientsInfo;
  orderId: string;
  discount: number;
  payment: IPayment | undefined;
}
