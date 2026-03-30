import { Routes } from '@angular/router';

export const routes: Routes = [
 { path: '',
    loadComponent: () => import('./features/home/home').then(m => m.HomeComponent)
},
{ path: 'articulos',
    loadComponent: () => import('./features/articles/article-list').then(m => m.ArticleListComponent)
},
{ path: 'articulos/:slug',
    loadComponent: () => import('./features/articles/article-detail').then(m => m.ArticleDetailComponent)
},
{
  path: 'categorias/:nombre',
  loadComponent: () => import('./features/categories/category').then(m => m.CategoryComponent)
},
{
  path: 'sobre-nosotros',
  loadComponent: () => import('./features/about/about').then(m => m.AboutComponent)
},
{
  path: 'contacto',
  loadComponent: () => import('./features/contact/contact').then(m => m.ContactComponent)

},
{
  path: '**',
  loadComponent: () => import('./features/not-found/not-found').then(m => m.NotFoundComponent)
}
];
