import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  information: any = null;
  loading = true;
  error: string | null = null;

  /**
   * Constructor of details page
   * @param activatedRoute Information about the route we are on
   * @param movieService The movie Service to get data
   */
  constructor(private activatedRoute: ActivatedRoute, private movieService: MovieService) { }


  ngOnInit() {
    // Get the ID that was passed with the URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'Movie ID not found in route.';
      this.loading = false;
      return;
    }

    // Get the information from the API
    this.movieService.getDetails(id).subscribe({
      next: result => {
        if (result && (result as any).Response === 'False') {
          this.error = (result as any).Error || 'Movie details could not be loaded.';
          this.information = null;
        } else {
          this.information = result;
        }
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Unable to load movie details. Please try again.';
        this.loading = false;
      }
    });
  }

  openWebsite() {
    if (this.information?.Website && this.information.Website !== 'N/A') {
      window.open(this.information.Website, '_blank');
    }
  }
}
