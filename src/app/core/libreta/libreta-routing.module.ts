import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibretaComponent } from './libreta.component';

const routes: Routes = [
    { path: '', component: LibretaComponent,
    children: [
      {
        path: 'add-libreta',
        loadChildren: () =>
          import('./add-libreta/add-libreta.module').then(
            (m) => m.AddLibretaModule
          ),
      },
      
    ]
  }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class LibretaRoutingModule {}