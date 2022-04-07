import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  favourites: Array<any> = [];

  constructor(private musicDataService: MusicDataService) {}

  ngOnInit() {
    this.musicDataService.getFavourites().subscribe((data) => {
      this.favourites = data.tracks;
      console.log(data);
    });
  }

  removeFromFavourites(id: any) {
    this.musicDataService.removeFromFavourites(id).subscribe((data) => {
      this.favourites = data.tracks;
    });
  }
}
