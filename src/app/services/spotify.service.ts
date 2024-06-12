import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AlbumDetail } from '../models/album-detail.dto';
import { Album } from '../models/albums.dto';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getQuery(query: string): Observable<any> {
    return this.authService.getValidToken().pipe(
      switchMap((token) => {
        const url: string = `https://api.spotify.com/v1/${query}`;

        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return this.http.get(url, { headers });
      })
    );
  }

  public getAlbumsList(): Observable<Album[]> {
    return this.getQuery('artists/06HL4z0CvFAxyc27GXpf02/albums').pipe(
      map((response: any) =>
        response.items.map((item: any) => Album.fromApiResponse(item))
      )
    );
  }

  public getAlbumById(id: string): Observable<AlbumDetail> {
    return this.getQuery(`albums/${id}`).pipe(
      map((item: any) => ({
        id: item.id,
        name: item.name,
        image_url: item.images[0]?.url,
        image_width: item.images[0]?.width,
        release_date: item.release_date,
        popularity: item.popularity,
        track_list: item.tracks.items.map((track: any) => ({
          id: track.id,
          name: track.name,
          duration_ms: track.duration_ms,
        })),
      }))
    );
  }
}
