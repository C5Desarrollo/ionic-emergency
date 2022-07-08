import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPagePage } from './main-page.page';

const routes: Routes = [
  {
    path: '',
    component: MainPagePage,
    children: [
      {
        path: 'video',
        loadChildren: () => import('./video/video.module').then( m => m.VideoPageModule)
      },
      {
        path: 'call',
        loadChildren: () => import('./call/call.module').then( m => m.CallPageModule)
      },
      {
        path: 'room',
        loadChildren: () => import('./room/room.module').then( m => m.RoomPageModule)
      },
    ]
  },
/*   {
    path: 'room',
    
  }, */
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPagePageRoutingModule {}
