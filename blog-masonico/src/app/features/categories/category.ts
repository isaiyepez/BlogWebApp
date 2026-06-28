import { Component, computed, inject, input } from '@angular/core';
import { ArticleService } from '../../core/services/article.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ArticleCardComponent } from "../../shared/article-card/article-card";


@Component({
  selector: 'app-category',
  imports: [ArticleCardComponent],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class CategoryComponent {

  private articleService = inject(ArticleService);

  nombre = input.required<string>();

  articles = toSignal(this.articleService.getArticles(), { initialValue: [] });

  filteredArticles = computed(() => {
    return this.articles()
      .filter(article => article.category.toLowerCase() === this.nombre().toLowerCase())});
}
