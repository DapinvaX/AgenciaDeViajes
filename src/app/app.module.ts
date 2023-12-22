import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinosComponent } from './destinos/destinos.component';
import { InicioComponent } from './inicio/inicio.component';
import { PaquetesTuristicosComponent } from './paquetes-turisticos/paquetes-turisticos.component';
import { PaqueteTuristicoComponent } from './paquetes-turisticos/paquete-turistico/paquete-turistico.component';
import { TpvComponent } from './tpv/tpv.component';

@NgModule({
  declarations: [
    AppComponent,
    DestinosComponent,
    InicioComponent,
    PaquetesTuristicosComponent,
    PaqueteTuristicoComponent,
    TpvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
