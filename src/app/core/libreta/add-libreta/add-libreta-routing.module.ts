import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLibretaComponent } from './add-libreta.component';

const routes: Routes = [{ path: '', component: AddLibretaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddLibretaRoutingModule { }
