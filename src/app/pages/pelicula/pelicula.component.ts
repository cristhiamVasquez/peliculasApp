import { Cast } from './../../interfaces/credits-response';
import { MovieResponse } from './../../interfaces/movie-response';
import { PeliculasService } from './../../services/peliculas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula: MovieResponse;
  public cast:  Cast[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService,
               private location: Location,
               private router: Router ) { }

  ngOnInit(): void {

    // const id = this.activatedRoute.snapshot.params.id;

    const { id } = this.activatedRoute.snapshot.params;  // destructura el objeto en base al valor a buscar

    combineLatest([

      this.peliculasService.getPeliculaDetalle( id ),
      this.peliculasService.getCast( id )

    ]).subscribe( ( [ pelicula, cast ] ) => {
      // console.log(pelicula, cast);

      if ( !pelicula ) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.pelicula = pelicula;

      this.cast = cast.filter( actor => actor.profile_path != null );


    } );


    // this.peliculasService.getPeliculaDetalle( id ).subscribe(movie => {

      // if ( !movie ) {
      //   this.router.navigateByUrl('/home');
      //   return;
      // }

      // this.pelicula = movie;
    // });

    // this.peliculasService.getCast( id ).subscribe( cast => {
    //   // console.log(cast);
    //   this.cast = cast.filter( actor => actor.profile_path != null );
    // } );

  }

  onRegresar(){

    this.location.back();

  }

}
