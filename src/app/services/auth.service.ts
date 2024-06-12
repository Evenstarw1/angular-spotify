import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private clientId = 'c551a28333694d638a41f142e37d511f';
  private clientSecret = 'c5f5fa7be2f94e54b9e6765f0423b31b';
  private tokenUrl = 'https://accounts.spotify.com/api/token';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  private getAccessToken(): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
    });

    const body = new HttpParams().set('grant_type', 'client_credentials');

    return this.http.post<any>(this.tokenUrl, body, { headers }).pipe(
      map((response) => {
        const { access_token } = response;
        const expirationTime = new Date().getTime();

        this.localStorageService.set('spotify_token', access_token);
        this.localStorageService.set(
          'spotify_token_expiration',
          expirationTime.toString()
        );

        return access_token;
      }),
      catchError((error) => {
        console.error('Error fetching access token', error);
        return of('');
      })
    );
  }

  public getValidToken(): Observable<string> {
    const token = this.localStorageService.get('spotify_token');
    const expiration = parseInt(
      this.localStorageService.get('spotify_token_expiration')
    );
    const now = new Date().getTime();

    const expirationWithBuffer = expiration + 60 * 60 * 1000;

    if (token && expiration && now < expirationWithBuffer) {
      return of(token);
    } else {
      return this.getAccessToken();
    }
  }
}
