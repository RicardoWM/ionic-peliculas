import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ResponseMovieDetails, Movie, Cast } from '../../models/movie';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id: string;
  descCompleta: number = 150;
  existeFavorito: boolean = false;
  iconFavorito: string = 'star-outline';

  movie: ResponseMovieDetails;
  casting: Cast[] = [];

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
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocalService: DataLocalService
  ) { }

  ngOnInit() {
    this.moviesService.getMovieDetails(this.id).subscribe(
      resp => {
        this.movie = resp;
        this.checkFavorito(this.movie.id);
      }
    );
    this.moviesService.getMovieCast(this.id).subscribe(
      resp => {
        this.casting = resp.cast;
      }
    );
  }

  leerMas(movie: Movie) {
    this.descCompleta = movie.overview.length;
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  addFavorite() {
    this.dataLocalService.saveFavoriteMovie(this.movie);
    this.checkFavorito(this.movie.id);
  }

  checkFavorito(id: number) {
    this.existeFavorito = this.dataLocalService.existeFavorito(id);
    this.iconFavorito = this.existeFavorito ? 'star' : 'star-outline';
  }


}
