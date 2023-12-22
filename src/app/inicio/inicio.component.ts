import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Cargamos los destinos
    this.destinos = this.getDestinos();

    // Cargamos los paquetes turísticos
    this.paquetes-turisticos = this.getPaquetesTuristicos();
  }

  async getDestinos() {
    // Realizamos una petición a nuestro backend
    const response = await fetch('https://localhost:3000/destinos');

    // Parseamos la respuesta
    const destinos = await response.json();

    return destinos;
  }

  async getPaquetesTuristicos() {
    // Realizamos una petición a nuestro backend
    const response = await fetch('https://localhost:3000/paquetes-turisticos');

    // Parseamos la respuesta
    const paquetesTuristicos = await response.json();

    return paquetesTuristicos;
  }
}
