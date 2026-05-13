import { Component, input } from '@angular/core';
import { Article } from '../../core/models/article.model';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-article-card',
  imports: [MatCardModule, MatChipsModule, MatButtonModule, RouterLink, DatePipe],
  templateUrl: './article-card.html',
  styleUrl: './article-card.scss',
})

export class ArticleCardComponent {
  article = input.required<Article>();
}
