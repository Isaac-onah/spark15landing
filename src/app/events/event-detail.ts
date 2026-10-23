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
    <div class="ul-container ul-section-spacing">
      <div class="row gx-0 gy-4 flex-column-reverse flex-lg-row">
        <div class="col-lg-4">
          <div class="ul-inner-sidebar">
            <div class="ul-inner-sidebar-widget ul-inner-sidebar-search">
              <h3 class="ul-inner-sidebar-widget-title">Search</h3>
              <div class="ul-inner-sidebar-widget-content">
                <form class="ul-blog-search-form" (ngSubmit)="onSearch()">
                  <input
                    type="search"
                    name="query"
                    [value]="query()"
                    (input)="query.set(inputValue($event))"
                    placeholder="Search events"
                  />
                  <button type="submit"><span class="icon"><i class="flaticon-search"></i></span></button>
                </form>
                @if (results(); as results) {
                  <div class="ul-inner-sidebar-posts sidebar-results">
                    @if (results.length === 0) {
                      <p>No events matched that search.</p>
                    } @else {
                      @for (item of results; track item.slug) {
                        <div class="ul-inner-sidebar-post">
                          <div class="img"><img [src]="item.image" alt="" /></div>
                          <div class="txt">
                            <h4 class="title"><a [routerLink]="['/events', item.slug]">{{ item.title }}</a></h4>
                            <span class="date"><span>{{ item.dateLabel }}</span></span>
                          </div>
                        </div>
                      }
                    }
                  </div>
                }
              </div>
            </div>

            <div class="ul-inner-sidebar-widget posts">
              <h3 class="ul-inner-sidebar-widget-title">Other events</h3>
              <div class="ul-inner-sidebar-widget-content">
                <div class="ul-inner-sidebar-posts">
                  @for (item of others(); track item.slug) {
                    <div class="ul-inner-sidebar-post">
                      <div class="img"><img [src]="item.image" alt="" /></div>
                      <div class="txt">
                        <h4 class="title"><a [routerLink]="['/events', item.slug]">{{ item.title }}</a></h4>
                        <span class="date"><span>{{ item.dateLabel }}</span></span>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>

            <div class="ul-inner-sidebar-widget categories">
              <h3 class="ul-inner-sidebar-widget-title">This event</h3>
              <div class="ul-inner-sidebar-widget-content">
                <div class="ul-inner-sidebar-categories event-facts">
                  <span>{{ event().category }}</span>
                  <span>{{ event().dateLabel }}</span>
                  <span>{{ event().time }}</span>
                  <span>{{ event().venue }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-8">
          <div class="ul-event-details ul-donation-details">
            <div class="ul-event-details-img"><img [src]="event().image" alt="" /></div>
            <div class="ul-event-details-infos">
              <div class="ul-event-details-info">
                <span class="icon"><i class="flaticon-calendar"></i></span>
                <span class="text">{{ event().dateLabel }} · {{ event().time }}</span>
              </div>
              <div class="ul-event-details-info">
                <span class="icon"><i class="flaticon-pin"></i></span>
                <span class="text">{{ event().venue }}</span>
              </div>
              <div class="ul-event-details-info">
                <span class="icon"><i class="flaticon-price-tag"></i></span>
                <span class="text">{{ event().category }}</span>
              </div>
            </div>
            <h2 class="ul-event-details-title">{{ event().title }}</h2>
            @for (paragraph of event().body; track paragraph) {
              <p class="ul-event-details-descr">{{ paragraph }}</p>
            }
            <h3 class="ul-event-details-inner-title">What this event is for</h3>
            <p class="ul-event-details-descr">{{ event().mission }}</p>
            <ul class="ul-event-details-list">
              @for (point of event().points; track point) {
                <li>{{ point }}</li>
              }
            </ul>
            <h3 class="ul-event-inner-title">Where to meet</h3>
            <p class="ul-event-details-descr">{{ event().venue }}</p>
            <div class="ul-event-details-map">
              <iframe [title]="'Map for ' + event().title" [src]="mapSrc()" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <h3 class="ul-event-inner-title">Ask to join</h3>
            <p>Tell us you are coming. Your email is only used to check this form.</p>
            <app-contact-form />
          </div>
        </div>
      </div>
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
      events.filter((item) =>
        `${item.title} ${item.venue} ${item.category} ${item.excerpt}`.toLowerCase().includes(term),
      ),
    );
  }

  protected inputValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }
}
