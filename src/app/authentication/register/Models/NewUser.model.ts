import { persona } from "./persona";
import { rol } from "./rol";

export class NewUser {
    username?: string;
    password?: string;
    pin?: string;
    estado?: boolean;
    persona?: persona;
    rol?: rol;
}