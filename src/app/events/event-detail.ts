import { Component, computed, effect, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { EventItem, events } from '../../data/content';
import { ContactForm } from '../shared/cards';

@Component({
  selector: 'app-event-detail',
  imports: [RouterLink, FormsModule, ContactForm],
  template: `
    <div class="wrap layout">
      <aside class="side">
        <div class="panel finder">
          <h3>Search</h3>
          <form (ngSubmit)="onSearch()">
            <input type="search" [value]="query()" (input)="query.set(inputValue($event))" placeholder="Search events" />
            <button class="btn teal" type="submit">Go</button>
          </form>
          @if (results(); as results) {
            <div style="margin-top: 12px">
              @if (results.length === 0) {
                <p>No events matched that search.</p>
              } @else {
                @for (item of results; track item.slug) {
                  <a class="side-link" [routerLink]="['/events', item.slug]">
                    <img [src]="item.image" alt="" />
                    <span>{{ item.dateLabel }}<br />{{ item.title }}</span>
                  </a>
                }
              }
            </div>
          }
        </div>
        <div class="panel">
          <h3>Other events</h3>
          @for (item of others(); track item.slug) {
            <a class="side-link" [routerLink]="['/events', item.slug]">
              <img [src]="item.image" alt="" />
              <span>{{ item.dateLabel }}<br />{{ item.title }}</span>
            </a>
          }
        </div>
        <div class="facts-list">
          <span>{{ event().category }}</span>
          <span>{{ event().dateLabel }}</span>
          <span>{{ event().time }}</span>
          <span>{{ event().venue }}</span>
        </div>
      </aside>
      <article class="article">
        <img class="cover" [src]="event().image" alt="" />
        <div class="info-row">
          <span>{{ event().dateLabel }} · {{ event().time }}</span>
          <span>{{ event().venue }}</span>
          <span>{{ event().category }}</span>
        </div>
        <h2>{{ event().title }}</h2>
        <div class="prose">
          @for (paragraph of event().body; track paragraph) {
            <p>{{ paragraph }}</p>
          }
          <h3>What this event is for</h3>
          <p>{{ event().mission }}</p>
          <ul class="points">
            @for (point of event().points; track point) {
              <li>{{ point }}</li>
            }
          </ul>
          <h3>Where to meet</h3>
          <p>{{ event().venue }}</p>
          <div class="map">
            <iframe [title]="'Map for ' + event().title" [src]="mapSrc()" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <h3>Ask to join</h3>
          <p>Tell us you are coming. Your email is only used to check this form.</p>
          <app-contact-form />
        </div>
      </article>
    </div>
  `,
})
export class EventDetail {
  readonly event = input.required<EventItem>();
  protected readonly query = signal('');
  protected readonly results = signal<EventItem[] | null>(null);
  protected readonly others = computed(() => events.filter((item) => item.slug !== this.event().slug));
  protected readonly mapSrc;

  constructor(sanitizer: DomSanitizer) {
    this.mapSrc = computed(() =>
      sanitizer.bypassSecurityTrustResourceUrl(
        `https://maps.google.com/maps?q=${encodeURIComponent(this.event().venue)}&z=14&output=embed`,
      ),
    );
    effect(() => {
      this.event();
      this.query.set('');
      this.results.set(null);
    });
  }

  protected onSearch() {
    const term = this.query().trim().toLowerCase();
    if (!term) {
      this.results.set([]);
      return;
    }
    this.results.set(
      events.filter((item) => `${item.title} ${item.venue} ${item.category} ${item.excerpt}`.toLowerCase().includes(term)),
    );
  }

  protected inputValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }
}
