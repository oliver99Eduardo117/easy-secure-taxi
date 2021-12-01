import { environment } from 'src/environments/environment';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

declare let google;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements AfterViewInit {
  @ViewChild('mapElement') mapNativeElement: ElementRef;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionForm: FormGroup;
  km: [];
  km2: number;
  tarifa: number;
  validacion: string;
  constructor(
    private fb: FormBuilder,
    public alertController: AlertController
  ) {
    this.createDirectionForm();
  }

  createDirectionForm() {
    this.directionForm = this.fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      zoom: 12,
      center: { lat: 21.161780, lng: -86.851497 },
    });
    this.directionsDisplay.setMap(map);
  }
  calculateAndDisplayRoute(formValues) {
    const that = this;
    this.directionsService.route(
      {
        origin: formValues.source,
        destination: formValues.destination,
        travelMode: 'DRIVING',
        drivingOptions: {
          departureTime: new Date(Date.now()), // for the time N milliseconds from now.
          trafficModel: 'optimistic',
        },
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        if (status === 'OK') {
          that.directionsDisplay.setDirections(response);
          this.km = response;

          this.km2 = this.km['routes'][0]['legs'][0]['distance']['value'];
        } else {
          window.alert('Direccion no encontrada ' + status);
        }
      }
    );
  }
  async presentAlert() {
    await new Promise<void>((done) => setTimeout(() => done(), 2000));

    this.tarifa = (this.km2 / 1000) * 32.5;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Tarifa asignada',
      subHeader: 'La tarifa de la ruta por ' + this.km2 / 1000 + 'km es',
      message: 'Precio estimado $' + this.tarifa + ' pesos',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Okay',
          role: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
