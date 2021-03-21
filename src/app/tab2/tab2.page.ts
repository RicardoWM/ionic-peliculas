import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../models/movie';
import { MoviesService } from '../services/movies.service';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  peliculas: Movie[] = [];
  textBuscar: string = '';
  sugerencias: string[] = ['Cadena perpetua', 'Seven', 'Piratas del Caribe'];
  buscando: boolean = false;

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) { }

  buscarPelicula(ev) {

    this.buscando = true;

    const valor = ev.detail.value;
    this.textBuscar = valor;
    if (valor === '') {
      this.peliculas = [];
      this.buscando = false;
      return;
    }
    this.moviesService.findMovies(this.textBuscar).subscribe(
      resp => {
        this.peliculas = resp.results;
        this.buscando = false;
      }
    );
  }

  sugerir(sugerencia) {
    this.textBuscar = sugerencia;
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
