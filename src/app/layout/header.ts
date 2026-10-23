import { Component, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { nav, searchContent, site } from '../../data/content';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  template: `
    @if (menuOpen()) {
      <button class="menu-backdrop" type="button" aria-label="Close menu" (click)="menuOpen.set(false)"></button>
    }
    <div class="ul-sidebar" [class.active]="menuOpen()">
      <div class="ul-sidebar-header">
        <div class="ul-sidebar-header-logo">
          <a routerLink="/" (click)="close()">
            <img src="/assets/img/logo.svg" alt="Charitics" class="logo" />
          </a>
        </div>
        <button class="ul-sidebar-closer" type="button" aria-label="Close menu" (click)="menuOpen.set(false)">
          <i class="flaticon-close"></i>
        </button>
      </div>
      <div class="ul-sidebar-header-nav-wrapper d-block d-lg-none">
        <nav class="mobile-nav">
          @for (item of nav; track item.to) {
            <a
              [routerLink]="item.to"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: item.to === '/' }"
              (click)="close()"
            >{{ item.label }}</a>
          }
        </nav>
        <a routerLink="/donations" class="ul-btn mobile-menu-cta" (click)="close()">
          <i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Make Donation
        </a>
      </div>
      <div class="ul-sidebar-footer">
        <span class="ul-sidebar-footer-title">Follow us</span>
        <div class="ul-sidebar-footer-social">
          @for (item of site.socials; track item.icon) {
            <a [href]="item.href"><i [class]="item.icon"></i></a>
          }
        </div>
      </div>
    </div>

    <div class="ul-search-form-wrapper flex-grow-1 flex-shrink-0" [class.active]="searchOpen()">
      <button class="ul-search-closer" type="button" (click)="searchOpen.set(false)">
        <i class="flaticon-close"></i>
      </button>
      <form class="ul-search-form" (ngSubmit)="onSearch()">
        <div class="ul-search-form-right">
          <input
            type="search"
            name="query"
            [value]="query()"
            (input)="query.set(inputValue($event))"
            placeholder="Search campaigns, events, stories"
          />
          <button type="submit"><span class="icon"><i class="flaticon-search"></i></span></button>
        </div>
        @if (submitted()) {
          <div class="search-results">
            @if (results().length === 0) {
              <p>Nothing matched “{{ submitted() }}”.</p>
            } @else {
              @for (hit of results(); track hit.to) {
                <a [routerLink]="hit.to" (click)="searchOpen.set(false)">
                  <span>{{ hit.type }}</span>
                  {{ hit.title }}
                </a>
              }
            }
          </div>
        }
      </form>
    </div>

    <header class="ul-header">
      <div class="ul-header-bottom to-be-sticky">
        <div class="ul-header-bottom-wrapper ul-header-container">
          <div class="logo-container">
            <a routerLink="/" class="d-inline-block">
              <img src="/assets/img/logo.svg" alt="Charitics" class="logo" />
            </a>
          </div>
          <div class="ul-header-nav-wrapper">
            <div class="to-go-to-sidebar-in-mobile">
              <nav class="ul-header-nav">
                @for (item of nav; track item.to) {
                  <a
                    [routerLink]="item.to"
                    routerLinkActive="active"
                    [routerLinkActiveOptions]="{ exact: item.to === '/' }"
                  >{{ item.label }}</a>
                }
              </nav>
            </div>
          </div>
          <div class="ul-header-actions">
            <button class="ul-header-search-opener" type="button" (click)="searchOpen.set(true)">
              <i class="flaticon-search"></i>
            </button>
            <a routerLink="/contact" class="ul-btn d-sm-inline-flex d-none">
              <i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Join With us
            </a>
            <button
              class="ul-header-sidebar-opener d-lg-none d-inline-flex"
              type="button"
              aria-label="Open menu"
              [attr.aria-expanded]="menuOpen()"
              (click)="menuOpen.set(true)"
            >
              <i class="flaticon-menu"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class Header {
  protected readonly nav = nav;
  protected readonly site = site;
  readonly menuOpen = signal(false);
  readonly searchOpen = signal(false);
  protected readonly query = signal('');
  protected readonly submitted = signal('');
  protected readonly results = signal(searchContent(''));

  constructor() {
    effect((onCleanup) => {
      document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
      onCleanup(() => {
        document.body.style.overflow = '';
      });
    });
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
}
