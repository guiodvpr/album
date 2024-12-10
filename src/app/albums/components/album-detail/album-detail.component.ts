import { Component, Input, OnInit } from '@angular/core';
import { Album, Comment } from '../../models/album.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlbumService } from '../../services/album.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe
  ]
})
export class AlbumDetailComponent implements OnInit {
  id: string | null = null; // ID del álbum
  album: Album | null = null; // Objeto del álbum
  comments: Comment[] = []; // Lista de comentarios asociados al álbum

  newComment: Comment = {} as Comment; // Modelo para el campo de entrada de un nuevo comentario

  constructor(private route: ActivatedRoute, private albumService: AlbumService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) {
      return;
    }
    this.loadAlbum();
  }

  loadAlbum(): void {
    if (this.id) {
      this.albumService.getAlbumById(parseInt(this.id)).subscribe({
        next: (data) => {
          this.album = data;
          this.comments = data.comments || [];
        },
        error: (err) => {
          console.error('Error al cargar álbum:', err);
        }
      });
    }
  }

  addComment(): void {
    if (!this.newComment.description) {
      return;
    }
    console.log(`Comentario: ${this.newComment.description} Valoración: ${this.newComment.rating}`);
    this.albumService.addComment(parseInt(this.id!), this.newComment).subscribe({
      next: (data) => {
        this.newComment = {} as Comment;
        this.comments.push(data);
      },
      error: (err) => {
        console.error('Error al agregar comentario:', err);
      }
    });
  }

  setRating(star: number) {
    this.newComment.rating = star;
  }
}
