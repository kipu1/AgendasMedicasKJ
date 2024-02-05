import { persona } from "src/app/authentication/register/Models/persona";
import { Antropometria } from "../../../core/staff/antropometria";


export class Paciente {

    id!: number;

    obra: string='';
    afiliado : string='';   
    telefono1: string='';
    telefono2: string='';
    telefono3: string='';
    clinicos: string='';
    diagnostico: string='';   
    cormobilidades: string='';
    familiar: string='';
    comentarios: string='';
    extra1: string='';
    extra2: string='';
    extra3: string='';
    extra4: string='';
    extra5: string='';
    extra6: string='';
    extra7: string='';   
    extra8: string='';
    extra9: string='';
    extra10: string='';
    persona!: persona;
    campoCfg1: string='';
    campoCfg2: string='';
    campoCfg3: string='';   
    abrir: string='';
    antropometria!:  Antropometria[];
}
