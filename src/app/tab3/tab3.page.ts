import { Component } from '@angular/core';
import { Genre, ResponseMovieDetails } from '../models/movie';
import { MoviesService } from '../services/movies.service';
import { DataLocalService } from '../services/data-local.service';

interface moviesGenre {
  genre: string;
  movies: ResponseMovieDetails[];
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  genres: Genre[] = [];
  movies: ResponseMovieDetails[] = [];
  genresAndMovies: moviesGenre[] = [];

  constructor(
    private moviesService: MoviesService,
    private dataLocalService: DataLocalService
  ) {}

  async ionViewWillEnter() {
    this.genresAndMovies = [];
    this.genres = await this.moviesService.getGenres();
    this.movies = await this.dataLocalService.loadFavorites();
    this.genres.forEach(g => {
      const existeGenre = this.movies.find(m => m.genres.filter(gm => gm.id === g.id).length > 0);
      if (existeGenre) {
        const peliculas: ResponseMovieDetails[] = this.movies.filter(m => m.genres.find(gm => gm.id === g.id));
        const genero: moviesGenre = {
          genre: g.name,
          movies: peliculas
        }
        this.genresAndMovies.push(genero);
      }
    });
  }

}
