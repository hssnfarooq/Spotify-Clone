import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit {
  releases: any;
  constructor(private musicDataService: MusicDataService) {}

  ngOnInit() {
    this.musicDataService
      .getNewReleases()
      .subscribe((releases) => (this.releases = releases.albums.items));
  }
}
