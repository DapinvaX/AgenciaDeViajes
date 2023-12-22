import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paquete-turistico',
  templateUrl: './paquete-turistico.component.html',
  styleUrls: ['./paquete-turistico.component.css']
})
export class PaqueteTuristicoComponent implements OnInit {
  formControl: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {

  }

  async ngOnInit() {
    // Obtiene el paquete turístico del parámetro de la ruta
    const id = this.route.snapshot.paramMap.get('id');

    // Realiza una petición a nuestro backend para obtener el paquete turístico
    const response = await fetch(`https://localhost:3000/paquetes-turisticos/${id}`);

    // Parseamos la respuesta
    const paqueteTuristico = await response.json();

    this.paqueteTuristico = paqueteTuristico;
    this.formControl = this.formBuilder.control(this.paqueteTuristico);
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
      this.router.navigate(['/confirmacion-pago']);
    } else {
      // Si el pago no es correcto, mostramos un mensaje de error
      alert(resultado.mensaje);
    }
  }

}
