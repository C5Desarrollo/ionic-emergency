import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  eventos = ['new-user','bye-user','admin-users-conected'];
  cbEvento: EventEmitter<any> = new EventEmitter<any>(); 

  constructor(
      private socket: Socket 
      ) { 
    this.escucharEvento();
  }

  escucharEvento = () => {
    this.eventos.forEach((nombreEvento)=>{
      this.socket.on(nombreEvento, datos => this.cbEvento.emit(
        {
          evento:nombreEvento,
          datos:datos
        }
      ));
    })
  }

  reunirASala = (datos) => {
    this.socket.emit('join',datos)
  }

  getAdminRooms= () => {
    const resp = this.socket.emit('admin')
    console.log('Rooms connected in admin client');
    console.log(resp);
  }
}
