import { Brand } from "../Brand/brand";
import { Model } from "../Model/model";

export interface Order {
  id: number;
  name: string;
  phone: string;
  brandCarId: number;
  modelCarId: number;
  governmentNumbers: string;
  timeOrder: Date;
}
