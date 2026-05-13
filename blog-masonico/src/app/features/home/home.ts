import { Component, computed, inject } from '@angular/core';
import { ArticleService } from '../../core/services/article.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ArticleCardComponent } from "../../shared/article-card/article-card";
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [ArticleCardComponent, RouterLink, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class HomeComponent {

  private articleService = inject(ArticleService);

  private articles = toSignal(this.articleService.getArticles(),
    { initialValue: [] }
  );

  public featureArticles = computed(() => {
    return this.articles()
      .filter(article => article.featured)
  });

}
