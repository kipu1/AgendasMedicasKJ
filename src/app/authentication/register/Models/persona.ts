import { Ciudad } from "./Ciudad.model";
import { Provincia } from "./Provincia.model";

export class persona {
    
    idPersona?: number;
    tipoDocumento?: string;
    documento?: string;
    primerNombre?: string;
    segundoNombre?: string;
    primerApellido?: string;
    segundoApellido?: string;
    genero?: string;
    fechanacimiento?: Date;
    estadoCivil?: string;
    grupoSanguineo?: string;
    email?:string;
    direccion?: string;
    telefono?: string;
    foto?: string;
    ciudad?: Ciudad;

}