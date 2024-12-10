import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Album } from '../../models/album.model';
import { AlbumService } from '../../services/album.service';

@Component({
  selector: 'app-album-create',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './album-create.component.html',
  styleUrl: './album-create.component.css'
})
export class AlbumCreateComponent {
  alertVisible: boolean = false;
  alertMessage: string = '';
  alertType: string = ''; // Can be 'success' or 'danger'

  constructor(private albumService: AlbumService) {}

  album: Album = {
    name: '',
    cover: '',
    releaseDate: new Date(),
    description: '',
    genre: '',
    recordLabel: ''
  };

  onSubmit(form: any): void {
    if (form.valid) {
      this.albumService.createAlbum(this.album).subscribe({
        next: (data) => {
          this.showAlert('Album created successfully!', 'success');
          console.log('Album created successfully:', data);
          this.clearForm(form);
        },
        error: (err) => {
          this.showAlert('Error creating album. Please try again.', 'danger');
          console.error('Error creating album:', err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  clearForm(form: any): void {
    this.album = {
      name: '',
      cover: '',
      releaseDate: new Date(),
      description: '',
      genre: '',
      recordLabel: ''
    };
    form.resetForm(); // This correctly resets the form state and model bindings.
  }

  showAlert(message: string, type: string): void {
    this.alertMessage = message;
    this.alertType = type;
    this.alertVisible = true;
    setTimeout(() => {
      this.alertVisible = false;
    }, 3000); // Hide the alert after 3 seconds
  }
}
