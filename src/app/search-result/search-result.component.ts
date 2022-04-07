import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  results: any;
  searchQuery: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private musicDataService: MusicDataService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'];
      this.musicDataService
        .searchArtists(this.searchQuery)
        .subscribe((data) => {
          this.results = data.artists.items.filter(
            (artist) => artist.images.length > 0
          );
        });
    });
  }
}
