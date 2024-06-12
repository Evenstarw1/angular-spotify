import { Component, Input } from '@angular/core';
import { Album } from '../../models/albums.dto';

@Component({
  selector: 'app-album-grid',
  templateUrl: './album-grid.component.html',
  styleUrls: ['./album-grid.component.css'],
})
export class AlbumGridComponent {
  @Input() albums: Album[] = [];

  displayedColumns: string[] = ['album-image', 'name', 'detail-button'];

  constructor() {}
}
