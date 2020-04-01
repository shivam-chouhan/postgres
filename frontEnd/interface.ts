import { Role } from "./enum.js";
export interface DataTypeOfUser {
    firstName: string;
    middleName:string;
    lastName : string;
    name: string;
    email:string;
    phone:string;
    roleId:Role;
    address:string;
    id : number;
    customerId :number;
}