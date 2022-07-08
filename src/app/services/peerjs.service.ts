import { Injectable, OnInit } from '@angular/core';
import Peer from 'peerjs';




const configuration = {
	config: {'iceServers': [
	  { url: 'stun:stun.l.google.com:19302' },
/* 	  { url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' } */
	]}
  }


@Injectable({
  providedIn: 'root'
})
export class PeerjsService{
  peer: any;


  constructor() {
    this.peer = new Peer(configuration);
   }

};
