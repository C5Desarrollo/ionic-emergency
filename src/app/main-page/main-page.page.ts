import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irASala = () => {
    this.router.navigate(['/main-page/room/uuid/',uuidv4()])
    console.log("ir a sala");
    
  }

  irAAdmin= () => {
    this.router.navigate(['/main-admin'])
    console.log("ir a sala");
    
  }

}
