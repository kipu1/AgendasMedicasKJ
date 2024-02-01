import { persona } from "./persona";
import { rol } from "./rol";

export class usuario {

  idUsuario?: number;
  username!: string;
  password!: string;
  persona!: persona;
  pin?: string;
  estado?: boolean;
  rol?: rol;

}