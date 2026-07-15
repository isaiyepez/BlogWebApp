# Plan de Trabajo - Blog Masónico en Angular
**Duración:** 1 semana | **Stack:** Angular 20 + .NET 9 Web API (opcional)

---

## Stack Tecnológico

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| Frontend | Angular 20 (Standalone + Signals + Zoneless) | La versión más moderna, APIs de signals estables |
| UI | Angular Material 3 | Componentes accesibles y bien documentados |
| Estilos | SCSS + CSS Custom Properties | Control total, nada de frameworks pesados |
| Routing | Angular Router (lazy loading) | Estándar de facto |
| Estado | Signals + `resource()` + Services (sin NgRx) | APIs estables en v20, sin sobreingeniería |
| Datos | JSON estático → .NET Web API | Empieza simple, conecta el backend cuando funcione el front |
| Deploy | GitHub Pages (frontend) | Gratis y simple |

---

## Estructura de Páginas

```
/                     → Home (artículos destacados + banner logia)
/articulos            → Listado de artículos (con filtro por categoría)
/articulos/:slug      → Detalle del artículo
/categorias/:nombre   → Artículos por categoría
/sobre-nosotros       → Historia y misión de la logia
/contacto             → Formulario de contacto
```

---

## Día 1 — Setup y Arquitectura
**Objetivo:** Proyecto corriendo con estructura definitiva

- [ ] Instalar Angular CLI 20 (`npm install -g @angular/cli@latest`)
- [ ] Crear proyecto Angular (`ng new blog-masonico --style=scss --routing --zoneless`)
- [ ] Instalar Angular Material (`ng add @angular/material`)
- [ ] Crear estructura de carpetas:
  ```
  src/app/
  ├── core/           → services, models, interceptors
  ├── features/
  │   ├── home/
  │   ├── articles/
  │   ├── about/
  │   └── contact/
  ├── shared/         → components reutilizables (card, header, footer)
  └── assets/data/    → articulos.json (mock data)
  ```
- [ ] Configurar rutas con lazy loading
- [ ] Crear modelo `Article` TypeScript
- [ ] Crear `ArticleService` con datos mock en JSON
- [ ] Header + Footer básicos

**Aprendizajes del día:** Standalone components, `providedIn: 'root'`, lazy routes, zoneless (sin Zone.js)

---

## Día 2 — Home Page + Listado de Artículos
**Objetivo:** Las dos páginas más importantes funcionando con datos reales

- [ ] **Home:** Banner de la logia + grid de artículos destacados
- [ ] **ArticleCardComponent:** Tarjeta reutilizable (imagen, título, categoría, fecha, extracto)
- [ ] **Listado `/articulos`:** Grid responsivo con todos los artículos
- [ ] Filtro por categoría (chips de Angular Material)
- [ ] Paginación o scroll infinito
- [ ] Poblar `articulos.json` con 6-8 artículos de prueba (contenido masónico real)

**Aprendizajes del día:** `@for`, `@if`, `input()`, `computed()`, `linkedSignal()`, pipes (`date`, `slice`)

---

## Día 3 — Detalle del Artículo
**Objetivo:** Experiencia de lectura completa

- [ ] Página de detalle con contenido completo
- [ ] Soporte para HTML enriquecido en el contenido (`[innerHTML]`)
- [ ] Barra lateral: artículos relacionados por categoría
- [ ] Breadcrumb de navegación
- [ ] Botones de compartir (Web Share API)
- [ ] SEO básico: `Title` y `Meta` services de Angular
- [ ] Manejo de artículo no encontrado (redirect a 404)

**Aprendizajes del día:** `ActivatedRoute`, `Router`, `Title`/`Meta` services, `DomSanitizer`

---

## Día 4 — Categorías, Búsqueda y Navegación
**Objetivo:** El usuario puede encontrar contenido fácilmente

- [ ] Página de categoría (`/categorias/:nombre`)
- [ ] Barra de búsqueda en el header (filtro en tiempo real con `debounceTime`)
- [ ] Menú de navegación responsivo (hamburger en móvil)
- [ ] Categorías sugeridas: Filosofía Masónica, Historia, Rituales, Espiritualidad, Noticias
- [ ] `404` page personalizada con imagen/mensaje de la logia

**Aprendizajes del día:** `rxjs` básico (`debounceTime`, `distinctUntilChanged`), `BreakpointObserver`

---

## Día 5 — Diseño y Experiencia Visual
**Objetivo:** Que se vea profesional y masónico

- [ ] Paleta de colores: azul oscuro + dorado + crema (inspirado en simbología masónica)
- [ ] Tipografía: serif para títulos (elegante), sans-serif para cuerpo
- [ ] Animaciones de entrada con Angular Animations (`@angular/animations`)
- [ ] Skeleton loaders mientras cargan artículos
- [ ] Página "Sobre Nosotros" con historia de la logia e imágenes
- [ ] Página de Contacto con formulario (Reactive Forms + validaciones)
- [ ] Ajustes responsive finales (mobile-first)

**Aprendizajes del día:** Angular Animations, Reactive Forms, SCSS variables y mixins

---

## Día 6 — Backend .NET (Opcional pero recomendado)
**Objetivo:** API real para los artículos, aprovechando tu conocimiento de .NET

- [ ] Crear proyecto `BlogWebApp.API` (.NET 9 Web API)
- [ ] Modelo `Article` en C# + `ArticlesController`
- [ ] EF Core con SQLite (sin infraestructura extra)
- [ ] Endpoints: `GET /api/articles`, `GET /api/articles/{slug}`, `GET /api/articles?category=`
- [ ] CORS configurado para Angular en dev
- [ ] Conectar Angular con `httpResource()` apuntando a la API real
- [ ] Variables de entorno Angular (`environment.ts`)

**Aprendizajes del día:** `httpResource()`, `environment`, signals vs observables, cuándo usar cada uno

---

## Día 7 — Pulido y Deploy
**Objetivo:** App publicada y presentable

- [ ] Revisión y corrección de bugs encontrados en la semana
- [ ] Verificar que el modo zoneless funciona correctamente en producción
- [ ] Imágenes optimizadas (WebP, lazy loading nativo)
- [ ] Build de producción (`ng build`) y verificar bundle size
- [ ] Deploy frontend en GitHub Pages (`angular-cli-ghpages`)
- [ ] README del proyecto
- [ ] (Opcional) Deploy API en Azure Free Tier o Railway

**Aprendizajes del día:** Zoneless change detection, build optimization, deploy pipeline

---

## Modelo de Datos

```typescript
// Article
{
  id: number
  slug: string           // 'los-tres-pilares-de-la-masoneria'
  title: string
  excerpt: string        // Resumen corto para las tarjetas
  content: string        // HTML del artículo completo
  category: string       // 'Filosofía Masónica'
  tags: string[]
  author: string
  publishedAt: Date
  coverImage: string     // URL de imagen
  featured: boolean      // Aparece en home
}
```

---

## Cómo Trabajaremos

Este proyecto es para **repasar y aprender Angular**, por lo tanto:

- **Tú escribes el código.** Claude te guía, explica el concepto y te dice qué hacer.
- Claude solo escribe código si tú lo pides explícitamente o si es algo muy mecánico (config, boilerplate mínimo).
- Cada task sigue este flujo:
  1. Claude explica el concepto y el objetivo
  2. Claude te indica qué archivo abrir y qué escribir (con snippets de referencia si hace falta)
  3. Tú lo implementas
  4. Claude revisa, corrige y explica cualquier duda
  5. Avanzamos al siguiente task

Si algo toma más tiempo de lo esperado, lo ajustamos sin problema.

---

## Prerequisitos para Empezar

1. **Node.js** v24.11.1 ✅ (compatible con Angular 20)
2. **Angular CLI 20** → `npm install -g @angular/cli@latest`
3. **VS Code** con extensiones: Angular Language Service, ESLint, Prettier
4. **Git** configurado ✅

Listo para arrancar con el Día 1.
