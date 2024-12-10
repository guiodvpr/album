import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCommentComponent } from './album-comment.component';

describe('AlbumCommentComponent', () => {
  let component: AlbumCommentComponent;
  let fixture: ComponentFixture<AlbumCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
