import { Component, Input } from '@angular/core';
import { Album } from '../../models/albums.dto';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.css'],
})
export class AlbumCardComponent {
  @Input() album!: Album;
}
