import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private http = inject(HttpClient);

  private articlesCache$ = this.http.get<Article[]>('data/articulos.json').pipe(
    shareReplay(1)
  );


  getArticles(): Observable<Article[]> {
    return this.articlesCache$;
  }

  getArticleBySlug(slug: string): Observable<Article | undefined> {
    return this.getArticles().pipe(
      map((articles: Article[]) => articles.find(article => article.slug === slug))
    );
  }

}
