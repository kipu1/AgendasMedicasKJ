import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-add-libreta',
  templateUrl: './add-libreta.component.html',
  styleUrls: ['./add-libreta.component.scss']
})
export class AddLibretaComponent {
  public routes = routes;
}
