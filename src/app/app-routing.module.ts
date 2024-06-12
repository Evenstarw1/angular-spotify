import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import { AlbumListComponent } from './components/album-list/album-list.component';

const routes: Routes = [
  {
    path: '',
    component: AlbumListComponent,
  },
  {
    path: 'album/:id',
    component: AlbumDetailComponent,
  },
  {
    path: '**',
    component: AlbumListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
