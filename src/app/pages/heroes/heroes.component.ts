import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: [
  ]
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  loading = false;

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {

    this.loading = true;
    this.heroesService.getHeroes()
      .subscribe( res => {
        console.log(res);
        this.heroes = res;
        this.loading = false;
      });

  }

  borrarHeroe( heroe: HeroeModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro que desea borrar a ${ heroe.nombre }?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( res => {

      if ( res.value ) {
        this.heroes.splice(i,1);
        this.heroesService.borrarHeroe( heroe.id ).subscribe();
      }

    });
    

  }

}
