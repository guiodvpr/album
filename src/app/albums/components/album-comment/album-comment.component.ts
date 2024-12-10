import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Comment } from '../../models/album.model';
import { AlbumService } from '../../services/album.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-album-comment',
  standalone: true,
  imports: [FormsModule, NgClass, NgFor, NgIf],
  templateUrl: './album-comment.component.html',
  styleUrls: ['./album-comment.component.css']
})
export class AlbumCommentComponent {

  idAlbum: string | null = null;

  constructor(private albumService: AlbumService, private route: ActivatedRoute, private router: Router) {
    this.idAlbum = this.route.snapshot.paramMap.get('id');
  }
  
  comment = {
    text: '',
    review: 0
  };

  // Create an array of 5 items for star display
  stars: number[] = Array(5).fill(0);

  onSubmit(form: any): void {
    if (form.valid && this.comment.text) {
      let comment: Comment = {
        description: this.comment.text,
        rating: this.comment.review
      };
      this.albumService.addComment(parseInt(this.idAlbum!), comment).subscribe({
        next: (data) => {
          this.clearForm(form);
          console.log('Comment added successfully:', data);
          this.router.navigateByUrl(`/albums/${this.idAlbum}/detail`);
        },
        error: (err) => {
          console.error('Error adding comment:', err);
        }
      });
    } else {
      console.log('Form is invalid');
      this.clearForm(form);
      return;
    }
  }

  setRating(rating: number): void {
    this.comment.review = rating;
  }

  clearForm(form: any): void {
    this.comment = {
      text: '',
      review: 0
    };
    form.resetForm();
  }
}
