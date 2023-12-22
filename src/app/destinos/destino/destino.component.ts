import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-destino',
  templateUrl: './destino.component.html',
  styleUrls: ['./destino.component.css'],
})
export class DestinoComponent implements OnInit {

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit() {
    this.destino = this.getDestino();
    this.formControl = this.formBuilder.control(this.destino);
  }

  async getDestino() {
    // Obtiene el destino del parámetro de la ruta
    const id = this.route.snapshot.paramMap.get('id');

    // Realiza una petición a nuestro backend para obtener el destino
    const response = await fetch(`https://localhost:3000/destinos/${id}`);

    // Parseamos la respuesta
    const destino = await response.json();

    return destino;
  }

  async pagar() {
    // Obtenemos los datos del pago del formulario
    const tarjeta = this.formControl.value.tarjeta;
    const fecha_caducidad = this.formControl.value.fecha_caducidad;
    const cvv = this.formControl.value.cvv;

    // Realizamos una petición a nuestro backend para procesar el pago
    const response = await fetch('https://localhost:3000/pago', {
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
