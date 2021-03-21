import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../../models/movie';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() movies: Movie[] = [];

  slideOpts = {
    freeMode: true,
    spaceBetween: -5,
    breakpoints:{
      320: {
        slidesPerView: 2.6,
      },
      350: {
        slidesPerView: 2.9,
      },
      390: {
        slidesPerView: 3.3,
      },
      440: {
        slidesPerView: 3.8,
      },
      500: {
        slidesPerView: 4.4,
      }
    },
  };

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

}
