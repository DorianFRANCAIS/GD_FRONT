import { EstablishmentInterface } from "./Establishment.interface";

export interface ActivityTypeInterface {
  id: Number;
  Establishment: EstablishmentInterface;
  title: String;
  description: String;
  duration: Number;
  maximumCapacity: Number;
  price: Number;
}
