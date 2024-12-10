import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album.model';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
  imports: [NgFor, NgIf, DatePipe, NgxPaginationModule],
  standalone: true,
})
export class AlbumListComponent implements OnInit {
  albums: Album[] = []; // Lista de álbumes cargados desde el servicio

  page = 1;
  loading = true;

  constructor(private albumService: AlbumService, private router: Router) {}

  ngOnInit(): void {
    this.loadAlbums();
  }

  // Cargar álbumes desde el servicio
  loadAlbums(): void {
    this.albumService.getAllAlbums().subscribe({
      next: (data) => {
        this.albums = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar álbumes:', err);
      }
    });
  }

  // Navegar al componente de creación de álbumes
  onCreate(): void {
    this.router.navigate(['/albums/create']);
  }

  // Ver detalles de un álbum
  onViewDetails(albumId?: number): void {
    if (!albumId) {
      return;
    }
    console.log("details");
    this.router.navigateByUrl(`/albums/${albumId}/detail`);
  }

  // Comentar un álbum
  onComment(albumId?: number): void {
    if (!albumId) {
      return;
    }
    console.log("comment");
    this.router.navigateByUrl(`/albums/${albumId}/comment`);
  }
}
