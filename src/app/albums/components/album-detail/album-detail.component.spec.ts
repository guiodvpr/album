import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumDetailComponent } from './album-detail.component';
import { AlbumService } from '../../services/album.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../../models/album.model';

fdescribe('AlbumDetailComponent', () => {
  let component: AlbumDetailComponent;
  let fixture: ComponentFixture<AlbumDetailComponent>;
  let mockAlbumService: jasmine.SpyObj<AlbumService>;

  beforeEach(async () => {
    mockAlbumService = jasmine.createSpyObj('AlbumService', ['getAlbumById']);

    await TestBed.configureTestingModule({
      imports: [AlbumDetailComponent],
      providers: [
        { provide: AlbumService, useValue: mockAlbumService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '186' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should display album name in title', () => {
    const album: Album = { 
      id: 186, 
      name: 'Test Album 186', 
      cover: '', 
      releaseDate: new Date(),
      description: '', 
      genre: '', 
      recordLabel: '', 
      comments: [] 
    };
    mockAlbumService.getAlbumById.and.returnValue(of(album));

    component.ngOnInit();
    fixture.detectChanges();

    const titleElement: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent).toContain('Test Album 186');
  });
});
