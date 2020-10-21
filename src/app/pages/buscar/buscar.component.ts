import { PeliculasService } from './../../services/peliculas.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public movies: Movie[] = [];
  public texto: string = '';

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {

      this.texto = params.texto;

      // TODO: Llamar al servicio
      this.peliculasService.buscarPeliculas(params.texto).subscribe( movies => {
        console.log(movies);
        this.movies = movies;
      } );
    } );
  }

}
