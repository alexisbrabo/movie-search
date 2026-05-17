import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MovieService, SearchType } from 'src/app/services/movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  results: Observable<any>;
  searchTerm = '';
  type: SearchType = SearchType.all;

  /**
   * Constructor of movies page
   * @param movieService The movie service to get data
   */
  constructor(private movieService: MovieService) { }

  ngOnInit() {}

  searchChanged(event?: any) {
    // Call our service function which returns an Observable
    this.results = this.movieService.searchData(this.searchTerm, this.type);
  }

}
