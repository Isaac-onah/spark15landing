import { Component, effect, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { nav, searchContent, site } from '../../data/content';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FormsModule],
  template: `
    @if (menuOpen()) {
      <button class="drawer-back" type="button" aria-label="Close menu" (click)="menuOpen.set(false)"></button>
    }
    @if (menuOpen()) {
      <div class="drawer">
        <div class="drawer-top">
          <a class="mark" routerLink="/" fragment="home" (click)="close()"><span class="mark-sq"></span>Spark 15</a>
          <button class="icon-btn" type="button" aria-label="Close menu" (click)="menuOpen.set(false)">×</button>
        </div>
        <nav>
          @for (item of nav; track item.fragment) {
            <a routerLink="/" [fragment]="item.fragment" [class.active]="active() === item.fragment" (click)="close()">{{ item.label }}</a>
          }
        </nav>
        <a class="btn" routerLink="/" fragment="donate" (click)="close()">Donate</a>
        <p>{{ site.phone }}</p>
      </div>
    }

    <header class="top">
      <div class="wrap top-bar">
        <a class="mark" routerLink="/" fragment="home"><span class="mark-sq"></span>Spark 15</a>
        <nav class="desk-nav">
          @for (item of nav; track item.fragment) {
            <a routerLink="/" [fragment]="item.fragment" [class.active]="active() === item.fragment">{{ item.label }}</a>
          }
        </nav>
        <div class="top-actions">
          <button class="icon-btn" type="button" aria-label="Search" (click)="searchOpen.set(!searchOpen())">Search</button>
          <a class="btn donate-desk" routerLink="/" fragment="donate">Donate</a>
          <button class="menu-btn" type="button" aria-label="Open menu" [attr.aria-expanded]="menuOpen()" (click)="menuOpen.set(true)">☰</button>
        </div>
      </div>
      @if (searchOpen()) {
        <div class="search-panel">
          <form class="wrap" (ngSubmit)="onSearch()">
            <input type="search" [value]="query()" (input)="query.set(inputValue($event))" placeholder="Search campaigns, events, stories" />
            <button class="btn" type="submit">Search</button>
          </form>
          @if (submitted()) {
            <div class="wrap search-hits">
              @if (results().length === 0) {
                <p>Nothing matched “{{ submitted() }}”.</p>
              } @else {
                @for (hit of results(); track hit.to) {
                  <a [routerLink]="hit.to" (click)="searchOpen.set(false)"><span>{{ hit.type }}</span>{{ hit.title }}</a>
                }
              }
            </div>
          }
        </div>
      }
    </header>
  `,
})
export class Header implements OnDestroy {
  protected readonly nav = nav;
  protected readonly site = site;
  readonly menuOpen = signal(false);
  readonly searchOpen = signal(false);
  protected readonly query = signal('');
  protected readonly submitted = signal('');
  protected readonly results = signal(searchContent(''));
  protected readonly active = signal('home');
  private navSub: { unsubscribe: () => void } | null = null;
  private readonly onScroll = () => this.mark();

  constructor(router: Router) {
    effect((onCleanup) => {
      document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
      onCleanup(() => {
        document.body.style.overflow = '';
      });
    });
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.navSub = router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      window.setTimeout(() => this.mark(), 80);
    });
    this.mark();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll);
    this.navSub?.unsubscribe();
  }

  close() {
    this.menuOpen.set(false);
    this.searchOpen.set(false);
  }

  protected onSearch() {
    const term = this.query();
    this.submitted.set(term);
    this.results.set(searchContent(term));
  }

  protected inputValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }

  private mark() {
    const nodes = [...document.querySelectorAll<HTMLElement>('[data-nav]')];
    if (!nodes.length) {
      this.active.set('');
      return;
    }
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
    if (atBottom) {
      this.active.set(nodes[nodes.length - 1].id);
      return;
    }
    let current = nodes[0].id;
    for (const node of nodes) {
      if (node.getBoundingClientRect().top <= 100) current = node.id;
    }
    this.active.set(current);
  }
}
