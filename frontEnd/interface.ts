import { Role } from "./enum.js";
export interface DataType {
    first_name: string;
    middle_name:string;
    last_name : string;
    email:string;
    phone:string;
    role:Role;
    address:string;
    id : number
    // length:number;
    // data : Array<string>;
}
export interface validateVar{
    firstName: string;
    middleName:string;
    lastName : string;
    email:string;
    phone:string;
    address:string;
    editedData:string[];
}