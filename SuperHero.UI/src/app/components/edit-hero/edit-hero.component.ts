import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SuperHero } from 'src/app/models/super-hero';
import { SuperHeroService } from 'src/app/services/super-hero.service';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
})
export class EditHeroComponent {
  @Input() hero?: SuperHero;
  @Output() heroesUpdated = new EventEmitter<SuperHero[]>()

  error?: string

  constructor(private superHeroServices: SuperHeroService) { }

  updateHero(hero: SuperHero) {
    this.superHeroServices
      .updateSuperHeroes(hero)
      .subscribe({
        next: (heroes: SuperHero[]) => {
          this.heroesUpdated.emit(heroes)
        },
        error: (error) => {
          this.error = error?.error
        },
        complete: () => {
          delete this.hero
        }
      })
  }

  deleteHero(hero: SuperHero) {
    this.superHeroServices
      .deleteSuperHeroes(hero)
      .subscribe({
        next: (heroes: SuperHero[]) => {
          this.heroesUpdated.emit(heroes)
        },
        error: (error) => {
          this.error = error?.error
        },
        complete: () => {
          delete this.hero
        }
      })
  }

  createHero(hero: SuperHero) {
    this.superHeroServices
      .createSuperHeroes(hero)
      .subscribe({
        next: (heroes: SuperHero[]) => {
          this.heroesUpdated.emit(heroes)
        },
        error: (error) => {
          this.error = error?.error
        },
        complete: () => {
          hero.name = ''
          hero.firstName = ''
          hero.lastName = ''
          hero.place = ''
        }
      })
  }

  cancel() {
    delete this.hero
  }
}
