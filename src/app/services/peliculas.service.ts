import { Cast, CreditsResponse } from './../interfaces/credits-response';
import { MovieResponse } from './../interfaces/movie-response';
import { CarteleraResponse, Movie } from './../interfaces/cartelera-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { tap, map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor( private http: HttpClient ) { }

  get params(){
    return {
      api_key: 'd390b247cabb2a92d80dc41d0d050459',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  resetCarteleraPage(){
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]>{

    // console.log('Llamando API');

    if ( this.cargando ){
      return of([]) ;
    }

    this.cargando = true;

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing?`, {
      params: this.params 
    }).pipe(
      map( (resp) => resp.results ),
      tap( () => {
      this.carteleraPage += 1;
      this.cargando = false;
      } )
    );

  }

  buscarPeliculas( texto:string ){

    const params = {...this.params, page: '1', query: texto};

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie?`, {
      params
    }).pipe(
      map( resp => resp.results )
    );

  }

  getPeliculaDetalle( id: string ){


    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`,{
      params: this.params
    }).pipe(
      catchError( err => of(null) )
    )

  }

  getCast( id: string ): Observable<Cast[]>{


    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`,{
      params: this.params
    }).pipe(
      map( resp => resp.cast ),
      catchError( err => of([]) )
    );

  }
}
