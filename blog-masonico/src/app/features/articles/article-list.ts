import { Component, computed, inject, signal } from '@angular/core';
import { ArticleService } from '../../core/services/article.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ArticleCardComponent } from "../../shared/article-card/article-card";
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-article-list',
  imports: [ArticleCardComponent, MatChipsModule],
  templateUrl: './article-list.html',
  styleUrl: './article-list.scss',
})

export class ArticleListComponent {

  private articleService = inject(ArticleService);

  public selectedCategory = signal(null);

  private articles = toSignal(this.articleService.getArticles(),
    { initialValue: [] }
  );

  public filteredArticles = computed(() => {
    const category = this.selectedCategory();

    return this.articles()
    .filter(article => !category || article.category === category);
  });

  public categories = computed(() => {
    const categoriesSet = new Set(this.articles().map(article => article.category));
    return Array.from(categoriesSet);
  });

}
