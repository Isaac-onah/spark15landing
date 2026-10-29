import { Component, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { events, features, members, partners, posts, site, slides, stats, testimonials } from '../../data/content';
import { ContactForm, EventCard, MemberCard, PostCard } from '../shared/cards';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ContactForm, EventCard, MemberCard, PostCard],
  template: `
    <section class="hero" id="home" data-nav>
      <div class="hero-copy">
        <span class="kicker">{{ slide.kicker }}</span>
        <h1>{{ slide.title }}</h1>
        <p class="lede">{{ slide.text }}</p>
        <div class="hero-actions">
          <a class="btn" routerLink="/" fragment="donate">Donate</a>
          <a class="btn line" routerLink="/" fragment="contact">Volunteer</a>
        </div>
      </div>
      <div class="hero-slider">
        <div class="ul-banner-2-slider swiper">
          <div class="swiper-wrapper">
            @for (item of slides; track item.image) {
              <div class="swiper-slide"><img [src]="item.image" alt="" /></div>
            }
          </div>
        </div>
        <div class="ul-banner-2-slider-navigation hero-nav">
          <button class="prev" type="button" aria-label="Previous slide">
            <img src="/assets/img/left-arrow.svg" alt="" />
          </button>
          <div class="ul-banner-2-thumb-slider swiper">
            <div class="swiper-wrapper">
              @for (item of slides; track item.image) {
                <div class="swiper-slide"><img [src]="item.image" alt="" /></div>
              }
            </div>
          </div>
          <button class="next" type="button" aria-label="Next slide">
            <img src="/assets/img/right-arrow.svg" alt="" />
          </button>
        </div>
      </div>
    </section>

    <section class="section" id="about" data-nav>
      <div class="wrap split">
        <img src="/assets/img/project-1.jpg" alt="" />
        <div>
          <span class="kicker">About</span>
          <h2>{{ site.aboutTitle }}</h2>
          <p class="lede" style="margin-top: 14px">{{ site.aboutText }}</p>
          <div class="stack">
            <div>Education, sports, and advocacy</div>
            <div>Volunteer teams you can join</div>
          </div>
          <a class="btn teal" routerLink="/about">Who we are</a>
        </div>
      </div>
      <div class="aim-band">
        <div class="aim">
          <article class="aim-vision">
            <span>Vision</span>
            <p>Refugee youth is welcomed and included in Maltese society, able to live in dignity, develop, and contribute.</p>
          </article>
          <article class="aim-mission">
            <span>Mission</span>
            <p>Provide the information, education, and training refugee youth need for integration into Maltese society.</p>
          </article>
        </div>
        <div class="wrap facts-hang">
          <div class="facts">
            @for (stat of stats; track stat.label) {
              <div>
                <strong>{{ stat.number }}</strong>
                <span>{{ stat.label }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="donate" data-nav>
      <div class="wrap">
        <div class="section-head">
          <div>
            <span class="kicker">Support</span>
            <h2>Education, sport, and advocacy</h2>
          </div>
        </div>
      </div>
      <div class="wrap areas">
        @for (feature of features; track feature.title) {
          <a [routerLink]="feature.link">
            <div class="area-photo">
              <img [src]="feature.image" alt="" />
              <em>{{ feature.word }}</em>
            </div>
            <span class="n">{{ feature.n }}</span>
            <strong>{{ feature.title }}</strong>
            <span class="go">See this work</span>
          </a>
        }
      </div>
    </section>

    <section class="section" style="padding-top: 0">
      <div class="wrap">
        <div class="section-head">
          <div>
            <span class="kicker">Together</span>
            <h2>Our partners</h2>
          </div>
        </div>
      </div>
      <div class="partner-window">
        <div
          class="partner-track"
          [style.transform]="partnerShift()"
          [style.transition]="partnerJump() ? 'none' : 'transform 0.7s ease'"
          (transitionend)="onPartnerSlide($event)"
        >
          @for (item of partnerLoop; track $index) {
            <div class="partner-logo">
              <img [src]="item.image" [alt]="item.name" />
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section" id="events" data-nav style="padding-top: 0">
      <div class="wrap">
        <div class="section-head">
          <div>
            <span class="kicker">Activities</span>
            <h2>Come and take part</h2>
          </div>
          <a class="btn line" routerLink="/events">All events</a>
        </div>
        <div class="event-grid">
          @for (item of upcoming; track item.slug) {
            <app-event-card [item]="item" />
          }
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: 0">
      <div class="wrap">
        <div class="section-head">
          <div>
            <span class="kicker">People</span>
            <h2>The board and the team</h2>
          </div>
          <a class="btn line" routerLink="/team">The team</a>
        </div>
        <div class="grid-4">
          @for (item of members; track item.slug) {
            <app-member-card [item]="item" />
          }
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: 0">
      <div class="wrap">
        <span class="kicker">From Spark 15</span>
        <div class="quotes">
          @for (item of quotes; track item.name) {
            <article>
              <p>{{ item.quote }}</p>
              <span>{{ item.name }} · {{ item.role }}</span>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="section" id="blog" data-nav style="padding-top: 0">
      <div class="wrap">
        <div class="section-head">
          <div>
            <span class="kicker">Stories</span>
            <h2>News from the youth group</h2>
          </div>
          <a class="btn line" routerLink="/blog">All stories</a>
        </div>
        <div class="grid-3">
          @for (item of stories; track item.slug) {
            <app-post-card [item]="item" />
          }
        </div>
      </div>
    </section>

    <section class="section" id="contact" data-nav style="padding-top: 0">
      <div class="wrap split">
        <div>
          <span class="kicker">Contact</span>
          <h2>Call, write, or send a message</h2>
          <p class="lede" style="margin: 12px 0 18px">{{ site.phone }} · {{ site.email }}</p>
        </div>
        <div class="panel">
          <app-contact-form />
        </div>
      </div>
    </section>
  `,
})
export class HomePage implements OnDestroy {
  protected readonly slide = slides[0];
  protected readonly slides = slides;
  protected readonly features = features;
  protected readonly site = site;
  protected readonly stats = stats;
  protected readonly upcoming = events.slice(0, 4);
  protected readonly members = members;
  protected readonly quotes = testimonials.slice(0, 2);
  protected readonly stories = posts.slice(0, 3);
  private readonly partnerSet = Array.from({ length: 4 }, () => partners).flat();
  protected readonly partnerLoop = [...this.partnerSet, ...this.partnerSet];
  protected readonly partnerIndex = signal(this.partnerSet.length);
  protected readonly partnerJump = signal(false);
  private partnerTimer = 0;

  constructor() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      this.partnerTimer = window.setInterval(() => this.partnerIndex.update((value) => value - 1), 3000);
    }
  }

  ngOnDestroy() {
    window.clearInterval(this.partnerTimer);
  }

  protected partnerShift() {
    return `translateX(-${this.partnerIndex() * 200}px)`;
  }

  protected onPartnerSlide(event: TransitionEvent) {
    if (event.propertyName !== 'transform' || this.partnerIndex() > 0) return;
    this.partnerJump.set(true);
    this.partnerIndex.set(this.partnerSet.length);
    requestAnimationFrame(() => this.partnerJump.set(false));
  }
}
