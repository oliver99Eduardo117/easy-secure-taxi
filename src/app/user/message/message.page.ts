import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { IonContent } from '@ionic/angular';
import * as firebase from 'firebase/compat';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import { LoadingService } from 'src/app/services/loading.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  userName = 'The Pulpin';
  userTaxi = 'Taxista';
  message = '';
  messages = [];
  db = getDatabase();
  dbRef = ref(this.db, '/Mensajes');

  constructor(private loadingSvc: LoadingService) {
    this.getMessage();
  }

  ngOnInit() {
  }

  async getMessage(){
    this.loadingSvc.cargando();
    try {
      onValue(this.dbRef, (snapshot) => {
        this.messages = [];
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          this.messages.push(childData);
        });
      });
      this.scrollToBottom();
    } catch (error) {
      console.log('Error->', error);
    }
    this.loadingSvc.dismiss();
    this.scrollToBottom();
  }

  scrollToBottom(){
    console.log('ini->');
    delay(5000);
    console.log('fin->');
    const contentEnd = document.getElementById ('content-end');
    this.content.scrollToBottom();
    // this.content2;
  }

  sendMessage(){
    if(this.message !== ''){
      const newMessage = push(this.dbRef);
      set(newMessage, {mensaje: this.message, nombre: this.userName });
      this.message = '';
    }
  }
}
