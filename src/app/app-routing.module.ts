import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumListComponent } from './albums/components/album-list/album-list.component';
import { AlbumCreateComponent } from './albums/components/album-create/album-create.component';
import { AlbumDetailComponent } from './albums/components/album-detail/album-detail.component';
import { AlbumCommentComponent } from './albums/components/album-comment/album-comment.component';

const routes: Routes = [
  { path: 'albums', component: AlbumListComponent },
  { path: 'albums/create', component: AlbumCreateComponent }, // Ensure you have AlbumCreateComponent
  { path: 'albums/:id/detail', component: AlbumDetailComponent }, // Ensure you have AlbumDetailComponent
  { path: 'albums/:id/comment', component: AlbumCommentComponent }, // Ensure you have AlbumCommentComponent
  { path: '', redirectTo: '/albums', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/albums' } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }