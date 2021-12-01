import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, orderByChild, push, query, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-service-taxi',
  templateUrl: './service-taxi.page.html',
  styleUrls: ['./service-taxi.page.scss'],
})
export class ServiceTaxiPage implements OnInit {

  servicios = [];
  db = getDatabase();
  auth = getAuth();
  uid = this.auth.currentUser.uid;
  refBD = ref(this.db, 'Usuarios/'+ this.uid + '/Servicios');

  constructor(private loadingSvc: LoadingService) {
    this.myServices();
  }

  ngOnInit() {
  }

  newService(){
    const newService = push(this.refBD);
    set(newService, {
      uidTaxi: 'name',
      distancia: '18',
      tiempo: '15',
      precio: '58',
      fecha: '29/11/2021',
      estatus: 'En ruta'
    });
  }

  async myServices(){
    this.loadingSvc.cargando();
    try {
      onValue(this.refBD, (snapshot) => {
        this.servicios = [];
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          this.servicios.push(childData);
        });
      });
    } catch (error) {
      console.log('Error->', error);
    }
    this.loadingSvc.dismiss();
  }
}
