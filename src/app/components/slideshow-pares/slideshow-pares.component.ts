import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() movies: Movie[] = [];
  @Output() loadMore = new EventEmitter();

  slideOpts = {
    slidesPerView: 3.1,
    freeMode: true,
    spaceBetween: -20
  };

  constructor() { }

  ngOnInit() {}

  onClick() {
    this.loadMore.emit();
  }

}
