import { Component, OnInit } from '@angular/core';
import { PeerjsService } from '../services/peerjs.service';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.page.html',
  styleUrls: ['./main-admin.page.scss'],
})
export class MainAdminPage implements OnInit {

  checkMediaDevices = () => {
        if(navigator && navigator.mediaDevices){
          navigator.mediaDevices.getUserMedia({
            audio:false,
            video:true
          }).then((stream)=>{
            this.currentStream = stream;
            this.addVideoUser(stream);
          }).catch(()=>{
            console.log("*** ERROR *** Not permissions ");
          });
        }else{
          console.log("*** ERROR *** Not media devices");
        }
  }
  
  constructor( 
        private webSocketService: WebSocketService, 
        private peerService: PeerjsService
    ) { }

  nombreSala: string;
  currentStream: any;
  listUser:Array<any> = []
  
  conexiones: any = {}
  peer: any = {}
  conn:any = {}  
  codigo: string = ''

  ngOnInit() {
    this.checkMediaDevices();
      this.iniciarPeer();
      this.iniciarSocket();
  }

  iniciarPeer = ()=>{
        const peer = this.peerService.peer;
        peer.on('open',(id)=>{
          const body = {
            idPeer:id,
            roomName:"admin"
          };
          this.webSocketService.reunirASala(body);
          //this.webSocketService.getAdminRooms(body)
          
        });
        peer.on('call', llamadaEntrante => {
          llamadaEntrante.answer(this.currentStream);
          llamadaEntrante.on('stream', (streamRemoto)=>{
            this.addVideoUser(streamRemoto);
          })
        },err => {
          console.log('*** ERROR *** Llamada Peer: ', err);
        });
    }//fin iniciar peer

    iniciarSocket = () => {
        this.webSocketService.cbEvento.subscribe(res => {
          if(res.evento=== 'new-user'){
            this.sendCall(res.datos.idPeer,this.currentStream )
            //this.getRoomsUser(res.datos.idPeer,this.currentStream )
          }
          if(res.evento=== 'admin-users-conected'){
            //this.sendCall(res.datos.idPeer,this.currentStream )
            this.getRoomsUser(res.datos.idPeer,this.currentStream )
          }
        })
    }//fin iniciarSocket



  addVideoUser = (stream:any) => {
      this.listUser.push(stream)
  }

  sendCall = (idPeer, stream)=>{
      const newUserCall = this.peerService.peer.call(idPeer,stream)
      if(!!newUserCall){
        newUserCall.on('stream', (userStream)=>{ 
          this.addVideoUser(userStream)
        }) 
      }
  }

  getRoomsUser(idPeer, stream){
      const newUserCall = this.peerService.peer.call(idPeer,stream)
      if(!!newUserCall){
        newUserCall.on('admin', (users)=>{ 
          console.log(users);
        }) 
      }
  }




}
