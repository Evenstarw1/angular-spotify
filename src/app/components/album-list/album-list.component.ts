import { Component } from '@angular/core';
import { Album } from '../../models/albums.dto';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.css',
})
export class AlbumListComponent {
  albums: Album[] = [];
  viewMode: 'cards' | 'grid' = 'cards';
  isLoading: boolean = false;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.spotifyService.getAlbumsList().subscribe(
      (data: Album[]) => {
        this.albums = data;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      (error) => {
        console.error('Error fetching albums', error);
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    );
  }

  toggleViewMode(mode: 'cards' | 'grid'): void {
    this.viewMode = mode;
  }
}
