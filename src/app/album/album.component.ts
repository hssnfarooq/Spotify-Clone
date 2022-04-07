import { Component, OnInit, Inject } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  album: any;
  constructor(
    private musicDataService: MusicDataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.musicDataService
        .getAlbumById(params['id'])
        .subscribe((album) => (this.album = album));
    });
  }

  addToFavourites(trackID: any) {
    this.musicDataService.addToFavourites(trackID).subscribe(
      (res) => {
        this.snackBar.open('Adding to Favourites...', 'Done', {
          duration: 1500,
        });
      },
      (err) => {
        this.snackBar.open('Unable to add song to Favourites', 'Error', {
          duration: 1500,
        });
      }
    );
  }
}
