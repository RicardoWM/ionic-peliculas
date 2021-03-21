import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ResponseMovieDetails, ResponseAPIMovie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  movies: ResponseMovieDetails[] = [];
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage,
    private toastCtrl: ToastController
  ) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    const moviesStorage = await this._storage.get('favoriteMovies');
    this.movies = moviesStorage ? moviesStorage : [];
  }

  saveFavoriteMovie(movie: ResponseMovieDetails) {
    const existe = this.movies.find(m => m.id === movie.id);

    if (existe) {
      this.movies = this.movies.filter(m => m.id !== movie.id);
      this.mensajeFavorito('Favorito eliminado!');
    } else {
      this.movies.push(movie);
      this.mensajeFavorito('Favorito añadido!');
    }
    this._storage?.set('favoriteMovies', this.movies);
  }

  existeFavorito(id: number): boolean {
    const existeMovie = this.movies.find(m => m.id === id);
    const existe = existeMovie ? true : false;
    return existe;
  }

  async mensajeFavorito(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }

  loadFavorites() {
    return new Promise<ResponseMovieDetails[]>(resolve => {
      resolve(this.movies);
    });
  }

}
