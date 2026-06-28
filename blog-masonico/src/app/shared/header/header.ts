import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, distinctUntilChanged, debounceTime } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  searchTerm = new Subject<string>();
  private router = inject(Router);

  constructor() {
    this.searchTerm.pipe(debounceTime(300), distinctUntilChanged()).subscribe((term) => {
      if (term.trim() !== '') {
        this.router.navigate(['/articulos', {queryParams: {search: term}}]);
      }
    });
  }

  ngOnDestroy() {
    this.searchTerm.unsubscribe();
  }
}
