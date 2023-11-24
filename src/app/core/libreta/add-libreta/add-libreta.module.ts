import { NgModule } from "@angular/core";
import { AddLibretaComponent } from "./add-libreta.component";
import { CommonModule } from "@angular/common";
import { AddLibretaRoutingModule } from "./add-libreta-routing.module";
import { FormsModule } from "@angular/forms";
import { materialModule } from "src/app/shared/material.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
    // declarations: [
    //     AddLibretaComponent
    // ],
    imports: [
      CommonModule,
      AddLibretaRoutingModule,
      SharedModule,
      materialModule,
      FormsModule
    ]
  })
  export class AddLibretaModule { }
  