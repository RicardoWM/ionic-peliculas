import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseAPIMovie, Movie } from '../models/movie';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  populares: Movie[] = [];
  pagePopulares: number = 0;

  private executeQuery<T>( query: string ) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es-ES`;

    return this.http.get<T>(query);

  }

  constructor(
    private http: HttpClient
  ) { }

  getFeature() {

    const today = new Date();
    const lastDay = new Date( today.getFullYear(), today.getMonth() + 1, 0 ).getDate();
    const mes = today.getMonth() + 1;
    let mesString;

    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${today.getFullYear()}-${mesString}-01`;
    const final = `${today.getFullYear()}-${mesString}-${lastDay}`;

    return this.executeQuery<ResponseAPIMovie>(`/discover/movie?release_date.gte=${inicio}&release_date.lte=${final}`);
  }

  getPopulares() {

    this.pagePopulares++;
    
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.pagePopulares}`;

    return this.executeQuery<ResponseAPIMovie>(query);

  }

}
