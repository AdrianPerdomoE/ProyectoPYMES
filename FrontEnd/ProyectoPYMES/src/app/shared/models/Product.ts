export class Product{
    constructor(
        public _id:string,
        public name: String,
        public pyme_id : string,
        public price: Number,
        public description: String,
        public stock:Number,
        public ignored:Boolean,
        public creationDate: Date,
        public updateDate:Date,
        public image:String
    ){

    }
}