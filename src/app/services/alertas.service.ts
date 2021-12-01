import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor( public alertC: AlertController, public toastC: ToastController ) { }

  async errorSesionAlert() {
    const alert = await this.alertC.create({
      header: 'Acceso Denegado!!!',
      backdropDismiss: false,
      message: 'Registrese o inicie sesión',
      buttons: ['OK']
    });
    await alert.present();
  }

  async errorSubirNoticiaAlert() {
    const alert = await this.alertC.create({
      header: 'Error',
      subHeader: 'Crear Noticia',
      backdropDismiss: false,
      message: 'Agregue una imagen por favor',
      buttons: ['OK']
    });

    await alert.present();
  }

  async newNoticiaCorrectoAlert() {
    const alert = await this.alertC.create({
      header: 'Felicidades!!!',
      backdropDismiss: false,
      message: 'La noticia se agrego corectamente',
      buttons: ['OK']
    });

    await alert.present();
  }

  async updateNotiAlert() {
    const alert = await this.alertC.create({
      header: 'Felicidades!!!',
      backdropDismiss: false,
      message: 'Se actualizo los datos de su Noticia correctamente',
      buttons: ['OK']
    });

    await alert.present();
  }
  async updateUserAlert() {
    const alert = await this.alertC.create({
      header: 'Felicidades!!!',
      backdropDismiss: false,
      message: 'Se actualizo los datos de su perfil',
      buttons: ['OK']
    });

    await alert.present();
  }

  async addFavAlert() {
    const toast = await this.toastC.create({
      message: 'Agregado a Favoritos',
      duration: 1000,
      color: 'tertiary'
    });
    toast.present();
  }

  async deleteFavAlert() {
    const toast = await this.toastC.create({
      message: 'Eliminado de Favoritos',
      duration: 1000,
      color: 'danger'
    });
    toast.present();
  }
}
