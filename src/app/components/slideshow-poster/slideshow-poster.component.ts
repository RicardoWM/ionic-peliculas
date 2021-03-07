import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() movies: Movie[] = [];

  slideOpts = {
    slidesPerView: 3.1,
    freeMode: true,
    spaceBetween: -20
  };

  constructor() { }

  ngOnInit() {}

}
