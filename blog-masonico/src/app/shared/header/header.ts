import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { Subject, distinctUntilChanged, debounceTime } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  searchTerm = new Subject<string>();
  private router = inject(Router);

  openMenu = signal(false);

  constructor() {
    this.searchTerm
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((term) => {
        if (term.trim() !== '') {
          this.router.navigate(['/articulos'], { queryParams: { search: term } });
        }
      });
  }

  onSearch(event: Event) {
    this.searchTerm.next((event.target as HTMLInputElement).value);
  }

  toggleMenu() {
    this.openMenu.update((value) => !value);
  }
}


