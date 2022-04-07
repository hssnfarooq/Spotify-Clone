import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit {
  artist: any;
  albums: any;
  constructor(
    private musicDataService: MusicDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.musicDataService
        .getArtistById(params['id'])
        .subscribe((artist) => (this.artist = artist));
      this.musicDataService
        .getAlbumsByArtistId(params['id'])
        .subscribe((albums) => {
          this.albums = albums.items.filter(
            (album) => album.name !== 'undefined'
          );
        });
    });
  }
}
