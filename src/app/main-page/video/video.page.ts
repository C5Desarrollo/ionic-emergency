import { Component, Input, OnInit } from '@angular/core';

import { PeerjsService } from '../../services/peerjs.service';

import { VideoPlayer } from '@awesome-cordova-plugins/video-player/ngx';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  
  @Input() stream:any;


  peer: any = {}
  conn:any = {}

  constructor(
    private peerService: PeerjsService,
    // private videoPlayer: VideoPlayer
    ) { }

  ngOnInit() {
  }
  
  

}
