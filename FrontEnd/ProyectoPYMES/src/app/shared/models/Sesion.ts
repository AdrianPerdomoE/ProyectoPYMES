import { Pyme } from "./Pyme";
import { User } from "./User";

export class Sesion {
    static GENERAL='GENERAL'
    static INSIDE = 'INSIDE'
    static MANAGE = 'MANAGE'
    public searchLevel:string;
    constructor(
        public CurrentSesion:User|Pyme
        
    ) { this.searchLevel = CurrentSesion instanceof User? Sesion.GENERAL: Sesion.MANAGE }
}