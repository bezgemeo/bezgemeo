import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainPageRoutingModule} from "./main-page-routing.module";
import {MainPageComponent} from "./main-page.component";
import {MatTableModule} from "@angular/material/table";

import {HeaderComponent} from "../../components/header/header.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    MainPageComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class MainPageModule {
}
