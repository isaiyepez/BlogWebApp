import { Component, inject, input, effect, computed } from '@angular/core';
import { ArticleService } from '../../core/services/article.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-article-detail',
  imports: [DatePipe, RouterLink, MatButtonModule],
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.scss',
})
export class ArticleDetailComponent {

  private articleService = inject(ArticleService);
  private router = inject(Router);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  protected hasSharedSupport = !!navigator.share;

  slug = input.required<string>();

  article = toSignal(
    toObservable(this.slug).pipe(
      switchMap(slug => this.articleService.getArticleBySlug(slug))
    ), { initialValue: null });

  articles = toSignal(this.articleService.getArticles(), { initialValue: [] });

  relatedArticles = computed(() => {
    return this.articles()
      .filter(article => article.category === this.article()?.category
        && article.id !== this.article()?.id)
  });

  constructor() {
    effect(() => {
      if (this.article() === undefined) {
        this.router.navigate(['/not-found']);
      }

      if (this.article()) {
        this.titleService.setTitle(`${this.article()!.title} | Blog Masónico`);
        this.metaService.updateTag({ name: 'description', content: this.article()!.excerpt });
        this.metaService.updateTag({ name: 'keywords', content: this.article()!.tags.join(', ') });

        this.metaService.updateTag({ property: 'og:title', content: this.article()!.title });
        this.metaService.updateTag({ property: 'og:description', content: this.article()!.excerpt });
        this.metaService.updateTag({ property: 'og:image', content: this.article()!.coverImage });
      }

    });
  }

  share() {

    const url = window.location.href;

    if (this.hasSharedSupport) {
      navigator.share({
        title: this.article()?.title,
        text: this.article()?.excerpt,
        url: url,
      }).catch((error) => console.error('Error sharing:', error));
    }
  }

}
