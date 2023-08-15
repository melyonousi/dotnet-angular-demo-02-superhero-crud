import { Injectable } from '@angular/core';
import { SuperHero } from '../models/super-hero';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroService {

  private url: string = "SuperHero"

  constructor(private http: HttpClient) { }

  public getSuperHeroes(): Observable<SuperHero[]> {
    return this.http.get<SuperHero[]>(`${environment.baseApiUrl}/${this.url}`)
  }

  public updateSuperHeroes(superHero: SuperHero): Observable<SuperHero[]> {
    return this.http.put<SuperHero[]>(`${environment.baseApiUrl}/${this.url}`, superHero)
  }

  public createSuperHeroes(superHero: SuperHero): Observable<SuperHero[]> {
    return this.http.post<SuperHero[]>(`${environment.baseApiUrl}/${this.url}`, superHero)
  }

  public deleteSuperHeroes(superHero: SuperHero): Observable<SuperHero[]> {
    return this.http.delete<SuperHero[]>(`${environment.baseApiUrl}/${this.url}/${superHero.id}`)
  }
}
