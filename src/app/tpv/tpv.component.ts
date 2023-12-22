import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tpv',
  templateUrl: './tpv.component.html',
  styleUrls: ['./tpv.component.css']
})
export class TpvComponent implements OnInit {
  formControl: FormControl = new FormControl;

  constructor() { }

  ngOnInit(): void {


  }

  async pagar() {
    // Obtenemos los datos del pago del formulario
    const tarjeta = this.formControl.value.tarjeta;
    const fecha_caducidad = this.formControl.value.fecha_caducidad;
    const cvv = this.formControl.value.cvv;

    // Realizamos una petición a nuestro backend para procesar el pago
    const response = await fetch('https://localhost:3000/tpv', {
      method: 'POST',
      body: JSON.stringify({
        tarjeta,
        fecha_caducidad,
        cvv,
      }),
    });

    // Parseamos la respuesta
    const resultado = await response.json();

    // Si el pago es correcto, redireccionamos al cliente a la página de confirmación
    if (resultado.ok) {
      window.location.href = '/confirmacion-pago';
    } else {
      // Si el pago no es correcto, mostramos un mensaje de error
      alert(resultado.mensaje);
    }
  }

}
