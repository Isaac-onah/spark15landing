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
    <main class="overflow-hidden">
      <router-outlet />
    </main>
    <app-footer />
  `,
})
export class Layout implements AfterViewInit, OnDestroy {
  private readonly header = viewChild(Header);
  private readonly router: Router;
  private stopWidgets: () => void = () => undefined;
  private timer = 0;
  private sub: { unsubscribe: () => void } | null = null;

  constructor(router: Router) {
    this.router = router;
  }

  ngAfterViewInit() {
    this.remount();
    this.sub = this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.header()?.close();
      window.scrollTo(0, 0);
      this.remount();
    });
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
}
