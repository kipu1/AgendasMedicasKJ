import { Component, ViewChild } from '@angular/core';

import { routes } from 'src/app/shared/routes/routes';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DataService } from 'src/app/shared/data/data.service';
import { Turno } from './turno';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { TurnoService } from './turno.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  public routes = routes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events: any[] = [];
  turno: Turno = new Turno();
  turnos: Turno[] = [];
  hora: string = '';
  validador: boolean = false;
  id!: number;
  pacienteActualizado= new Turno ();
  // ,timeGridDay
  @ViewChild('calendar') calendar!: FullCalendarComponent;
  constructor(private data: DataService,private auth: AuthService, private turnoService: TurnoService, private router: Router,private route: ActivatedRoute) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.data.getEvents().subscribe((events: any) => {
      this.events = events;
      this.options = { ...this.options, ...{ events: events } };
    });
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialDate: new Date(),
      
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek',
      },
      initialView: 'dayGridMonth',
      editable: true,
      selectable: true,
      
      selectMirror: true,
      dayMaxEvents: true,
      events: [
        { title: 'Meeting', start: new Date() }
      ],
      views: {
        timeGridWeek: {
          slotDuration: { hours: 1 },
          slotLabelInterval: { hours: 1 },
          slotLabelFormat: {
            hour: '2-digit',
            minute: '2-digit',
            omitZeroMinute: false,
            meridiem: 'short'
          }
        },
        timeGridDay: {
          slotDuration: { hours: 1 },
          slotLabelInterval: { hours: 1 },
          slotLabelFormat: {
            hour: '2-digit',
            minute: '2-digit',
            omitZeroMinute: false,
            meridiem: 'short'
          }
        }
      },
      
    };
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.obtenerpersona(); // Actualizar la lista después de la actualización
      this.turnoService.Buscarid(this.id).subscribe(
        response => {
            this.turno=response
       // Asigna los datos del paciente al modelo
      });
      // Ahora puedes usar el ID como desees en tu componente
    })

    
    
    this.obtenerdoctor();
    this.obtenerpersona();

  }
  
  actualizarDatos(id: number): void {
    console.log('Datos actualizados:', id);
    const nuevonombre = this.turno.turno;
    const nuevoclavesecre = this.turno.fecha;
    const nuevocomentario = this.turno.hora;

   
    
 
    
    // const nuevoSexo = this.paciente.sexo;
  

    // Crear un objeto 'pacienteActualizado' con los valores actualizados
    this.pacienteActualizado.turno=nuevonombre;
  
    this.pacienteActualizado.fecha=nuevoclavesecre;
    this.pacienteActualizado.hora=nuevocomentario;
   
   

    // Llamar al método actualizarPersona() del servicio para enviar los datos actualizados al servidor
    this.turnoService.actualizarPersona(this.id,this.pacienteActualizado).subscribe(
        response => {
            console.log('Datos actualizados:', this.pacienteActualizado);
            // Realizar cualquier otra lógica necesaria después de la actualización exitosa
        },
        error => {
            console.error('Error al actualizar los datos:', error);
            // Manejar el error de alguna manera apropiada en tu aplicación
        }
    );
} 
  obtenerpersona() {
    this.turnoService.obtenerListaPersona().subscribe(dato => {
      this.turnos = dato;
    });
  }
  agregarEventoAlCalendario(evento: any) {
    // Agrega el evento al calendario
    this.calendar.getApi().addEvent(evento);

    // Almacena el evento localmente
    const eventosGuardados = JSON.parse(localStorage.getItem('eventos') || '[]');
    eventosGuardados.push(evento);
    localStorage.setItem('eventos', JSON.stringify(eventosGuardados));
  }
  obtenerdoctor() {
    this.turnoService.obtenerListaPersona().subscribe(datos => {
      // Limpia los eventos existentes en el calendario
      this.calendar.getApi().removeAllEvents();
      console.log('Hora seleccionada:', this.turno.hora);
      // Itera sobre los datos obtenidos para construir eventos
      datos.forEach(turno => {
        const evento = {
          title: turno.turno,
          start: turno.fecha,
          hora: this.turno.hora, // Asegúrate de que la fecha esté en un formato válido para FullCalendar
          // Puedes agregar más propiedades del evento si es necesario
        };
  
        // Agrega el evento al calendario
        this.calendar.getApi().addEvent(evento);
      });
  
      // Actualiza la propiedad turnos con los nuevos datos
      this.turnos = datos;
    });
  }
  
  guardardoctor() {
    // Verifica que se haya ingresado un turno y una fecha
    if (!this.turno.turno || !this.turno.fecha || !this.turno.hora) {
      alert('Por favor, ingrese un turno, una fecha y una hora.');
      return;
    }
    //const fechaHoraFormateada = `${this.turno.fecha}T${this.turno.hora}:00`;
    // Crea el objeto de evento
    // Formatea la fecha al formato ISO8601
    
    const fecha = formatDate(this.turno.fecha, 'yyyy-MM-ddTHH:mm:ss', 'en-ES',);
   
    const nuevoEvento = {
      title: this.turno.turno,
      start: fecha
    };

  

  // Código para guardar la persona
  this.turnoService.registrarPersona(this.turno).subscribe(
    () => {
      this.agregarEventoAlCalendario(nuevoEvento);
      this.obtenerpersona();
    },
    error => {
      console.log(error);
      alert('Error al guardar la persona');
    }
  );

  // Limpia los campos después de guardar
  this.turno.turno = '';
  this.turno.fecha = '';
  this.turno.hora = '';
}




  onSubmit() {
    this.guardardoctor();
  }
}
