import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumDetail } from '../../models/album-detail.dto';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css'],
})
export class AlbumDetailComponent implements OnInit {
  AlbumDetail?: AlbumDetail;
  showAllDetails = false;

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.spotifyService.getAlbumById(id).subscribe((album) => {
        this.AlbumDetail = album;
      });
    }
  }

  toggleDetails(): void {
    this.showAllDetails = !this.showAllDetails;
  }
}
