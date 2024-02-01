import { Especialidad } from "./Especialidad.model";
import { persona } from "./persona";
export class Doctor {
    id?: number;
    persona?: persona;
    especialidad?: Especialidad;
    matricula?: string;
}