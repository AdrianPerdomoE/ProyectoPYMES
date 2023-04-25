import { Kart } from './Kart';
export class User {
  constructor(
    public _id: string,
    public name: String,
    public shoppingKart: Kart,
    public password?: String
  ) {}
}
