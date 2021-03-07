import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie, ResponseAPIMovie } from '../models/movie';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  moviesReciente: Movie[] = [];
  moviesPopulares: Movie[] = [];
 
  constructor(
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.moviesService.getFeature().subscribe(
      (resp) => {
        this.moviesReciente = resp.results;
      }
    );
    this.loadPopulares();
  }

  loadMore() {
    this.loadPopulares();
  }

  loadPopulares() {
    this.moviesService.getPopulares().subscribe(
      resp => {
        const arrTmp = [...this.moviesPopulares, ...resp.results];
        this.moviesPopulares = arrTmp;
      }
    );
  }

}
