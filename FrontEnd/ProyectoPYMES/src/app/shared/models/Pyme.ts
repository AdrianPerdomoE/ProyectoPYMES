import { PageStyle } from './pageStyle';

export class Pyme {
  constructor(
    public _id: string,
    public name: String,
    public category: String,
    public pageStyle: PageStyle,
    public creationDate: Date,
    public password?: String
  ) {}
}