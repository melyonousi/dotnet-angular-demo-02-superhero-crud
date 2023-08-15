import { Component } from '@angular/core';
import { SuperHero } from './models/super-hero';
import { SuperHeroService } from './services/super-hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Super Hero User Interface';
  heroes: SuperHero[] = []
  error: any
  loading: boolean = false
  heroToEdit?: SuperHero

  constructor(private superHeroService: SuperHeroService) { }

  ngOnInit(): void {
    this.loading = true
    this.superHeroService.getSuperHeroes().subscribe({
      next: (heroes: SuperHero[]) => {
        this.heroes = heroes.sort((a: SuperHero, b: SuperHero) => {
          let af, bf = 0
          af = a.id !== undefined ? a.id : 0
          bf = b.id !== undefined ? b.id : 0
          return af - bf
        })
      },
      complete: () => {
        this.loading = false
      },
      error: (error: any) => {
        this.loading = false
        this.error = error
      }
    })
  }

  updateSuperHeroesList(heroes: SuperHero[]) {
    this.heroes = heroes.sort((a: SuperHero, b: SuperHero) => {
      let af, bf = 0
      af = a.id !== undefined ? a.id : 0
      bf = b.id !== undefined ? b.id : 0
      return af - bf
    })
  }

  initNewHero() {
    this.heroToEdit = new SuperHero()
  }

  editHero(hero: SuperHero) {
    this.heroToEdit = hero
  }
}
