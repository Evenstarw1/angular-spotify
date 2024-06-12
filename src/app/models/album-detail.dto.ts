export interface AlbumDetail {
  id: string;
  name: string;
  image_url: string;
  image_width: number;
  release_date: string;
  popularity: number;
  track_list: Track[];
}

export interface Track {
  id: string;
  name: string;
  duration_ms: number;
}
