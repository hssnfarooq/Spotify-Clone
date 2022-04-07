import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from './../environments/environment';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusicDataService {
  constructor(
    private spotifyToken: SpotifyTokenService,
    private http: HttpClient
  ) {}

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.ListOfNewReleasesResponse>(
          'https://api.spotify.com/v1/browse/new-releases',
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  getArtistById(id: string): Observable<SpotifyApi.SingleArtistResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.SingleArtistResponse>(
          `https://api.spotify.com/v1/artists/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  getAlbumsByArtistId(
    id: string
  ): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.ArtistsAlbumsResponse>(
          `https://api.spotify.com/v1/artists/${id}/albums`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              include_groups: 'album,single',
              limit: '50',
            },
          }
        );
      })
    );
  }

  getAlbumById(id: string): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.SingleAlbumResponse>(
          `https://api.spotify.com/v1/albums/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  searchArtists(
    searchString: string
  ): Observable<SpotifyApi.ArtistSearchResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.ArtistSearchResponse>(
          'https://api.spotify.com/v1/search',
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              q: searchString,
              type: 'artist',
              limit: '50',
            },
          }
        );
      })
    );
  }

  addToFavourites(id: string): Observable<[String]> {
    // TODO: make a PUT request to environment.userAPIBase/favourites/:id to add id to favourites
    return this.http
      .put<[String]>(`${environment.userAPIBase}/favourites/${id}`, [id])
      .pipe(
        mergeMap((favouritesArray) => {
          return this.http.get<[String]>(
            `${environment.userAPIBase}/favourites`
          );
        })
      );
  }

  removeFromFavourites(id: string): Observable<any> {
    return this.http
      .delete<any>(`${environment.userAPIBase}/favourites/${id}`)
      .pipe(
        mergeMap((favouritesArray) => {
          // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
          // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
          if (favouritesArray) {
            return this.spotifyToken.getBearerToken().pipe(
              mergeMap((token) => {
                return this.http.get<any>('https://api.spotify.com/v1/tracks', {
                  headers: { Authorization: `Bearer ${token}` },
                  params: {
                    ids: favouritesArray.favourites.join(','),
                  },
                });
              })
            );
          } else {
            return new Observable((o) => {
              o.next({ tracks: [] });
              o.complete();
            });
          }
        })
      );
  }

  getFavourites(): Observable<any> {
    return this.http.get<any>(`${environment.userAPIBase}/favourites/`).pipe(
      mergeMap((favouritesArray) => {
        // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
        // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
        if (favouritesArray) {
          return this.spotifyToken.getBearerToken().pipe(
            mergeMap((token) => {
              return this.http.get<any>('https://api.spotify.com/v1/tracks', {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                  ids: favouritesArray.favourites.join(','),
                },
              });
            })
          );
        } else {
          console.log('No favourites');
          return new Observable((o) => {
            o.next({ tracks: [] });
            o.complete();
          });
        }
      })
    );
  }
}
