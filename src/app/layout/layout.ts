import { AfterViewInit, Component, OnDestroy, viewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { mountPageWidgets } from '../widgets';
import { Footer } from './footer';
import { Header } from './header';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-footer />
  `,
})
export class Layout implements AfterViewInit, OnDestroy {
  private readonly header = viewChild(Header);
  private sub: { unsubscribe: () => void } | null = null;
  private stopWidgets = () => {};
  private timer = 0;

  constructor(router: Router) {
    this.sub = router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.header()?.close();
      this.scrollToHash((event as NavigationEnd).urlAfterRedirects);
      this.remount();
    });
  }

  ngAfterViewInit() {
    this.remount();
    if (location.hash) this.scrollToHash(location.hash);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    window.clearTimeout(this.timer);
    this.stopWidgets();
  }

  private remount() {
    this.stopWidgets();
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.stopWidgets = mountPageWidgets();
    });
  }

  private scrollToHash(url: string) {
    const hash = decodeURIComponent(url.split('#')[1] ?? '');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(() => {
      if (!hash) {
        window.scrollTo(0, 0);
        return;
      }
      document.getElementById(hash)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }, 60);
  }
}
