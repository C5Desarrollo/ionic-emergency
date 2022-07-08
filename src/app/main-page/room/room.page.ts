import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeerjsService } from 'src/app/services/peerjs.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {

  nombreSala: string;
  currentStream: any;
  listUser:Array<any> = []

  constructor(private route: ActivatedRoute, private webSocketService: WebSocketService, private peerService: PeerjsService) {

    this.nombreSala = route.snapshot.paramMap.get('roomid')

    console.log('id-sala');
    console.log(this.nombreSala);
    

   }

  ngOnInit():void {
    this.checkMediaDevices();
    this.iniciarPeer();
    this.iniciarSocket();
    //console.log(this.listUser)
  }

  iniciarPeer = ()=>{
    const peer = this.peerService.peer;
    peer.on('open',(id)=>{

      const body = {
        idPeer:id,
        roomName:this.nombreSala
      };

      console.log('ID de peer: ', id);

      this.webSocketService.reunirASala(body);
      
    });

    peer.on('call', llamadaEntrante => {
      llamadaEntrante.answer(this.currentStream);
      llamadaEntrante.on('stream', (streamRemoto)=>{
        this.addVideoUser(streamRemoto);
      })
    },err => {
      console.log('*** ERROR *** Llamada Peer: ', err);
      
    });
  }

  iniciarSocket = () => {
    this.webSocketService.cbEvento.subscribe(res => {
      
      console.log( res);

      if(res.evento=== 'new-user'){

        this.sendCall(res.datos.idPeer,this.currentStream )
      }
      
      
    })
  }

  checkMediaDevices = () => {
    if(navigator && navigator.mediaDevices){

      navigator.mediaDevices.getUserMedia({
        audio:false,
        video:true
      }).then((stream)=>{
        this.currentStream = stream;
        this.addVideoUser(stream);
        console.log("stream connection");
        console.log(stream);
      }).catch(()=>{
        console.log("*** ERROR *** Not permissions ");
        
      });

    }else{
      console.log("*** ERROR *** Not media devices");
      
    }
  }

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

}
