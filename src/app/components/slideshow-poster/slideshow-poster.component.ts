import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../../models/movie';
import { DetalleComponent } from '../detalle/detalle.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  url: string = environment.imgPath

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
    private modalCtrl: ModalController,
    private socialSharing: SocialSharing
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

  share(movie: Movie) {
    this.socialSharing.share(movie.title, '', '', `${this.url}/w500/${movie.backdrop_path}`);
  }

}
