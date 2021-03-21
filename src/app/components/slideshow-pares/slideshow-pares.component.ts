import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../../models/movie';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() movies: Movie[] = [];
  @Output() loadMore = new EventEmitter();

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

  onClick() {
    this.loadMore.emit();
  }

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
