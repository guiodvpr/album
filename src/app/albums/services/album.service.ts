import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Album, Comment } from '../models/album.model';  // Asegúrate de actualizar la ruta según sea necesario
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private baseUrl = 'https://backvynils-q6yc.onrender.com/albums';
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  createAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.baseUrl, album, { headers: this.jsonHeaders });
  }

  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.baseUrl);
  }

  getAlbumById(albumId: number): Observable<Album> {
    return this.http.get<Album>(`${this.baseUrl}/${albumId}`);
  }

  updateAlbum(albumId: number, album: Album): Observable<Album> {
    return this.http.put<Album>(`${this.baseUrl}/${albumId}`, album, {
      headers: this.jsonHeaders,
    });
  }

  deleteAlbum(albumId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${albumId}`);
  }

  addComment(albumId: number, comment: Comment): Observable<any> {
    return this.http.post(`${this.baseUrl}/${albumId}/comments`, 
      {
        description: comment.description,
        rating: comment.rating,
        collector: {id: 1}
      }
      , { 
      headers: this.jsonHeaders,
    });
  }
}
