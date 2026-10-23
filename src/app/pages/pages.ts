import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import {
  campaigns,
  events,
  faqs,
  members,
  money,
  posts,
  progress,
  projects,
  services,
  site,
  stats,
} from '../../data/content';
import { EventDetail } from '../events/event-detail';
import { BlogPost } from '../blog/blog-post';
import {
  Article,
  ContactForm,
  DonateForm,
  DonationCard,
  EventCard,
  MemberCard,
  PageBanner,
  PostCard,
  ProjectCard,
  ServiceCard,
} from '../shared/cards';

function routeSlug() {
  const route = inject(ActivatedRoute);
  return toSignal(route.paramMap.pipe(map((params) => params.get('slug') ?? '')), { initialValue: '' });
}

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="ul-section-spacing">
      <div class="ul-container not-found">
        <img src="/assets/img/404-img.png" alt="" />
        <h2 class="ul-section-title">That page is not on this site</h2>
        <a routerLink="/" class="ul-btn">
          <i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Back home
        </a>
      </div>
    </section>
  `,
})
export class NotFoundPage {}

@Component({
  selector: 'app-about',
  imports: [RouterLink, PageBanner],
  template: `
    <app-page-banner title="About Us" />
    <section class="ul-about ul-section-spacing">
      <div class="ul-container">
        <div class="row row-cols-md-2 row-cols-1 align-items-center gy-4">
          <div class="col">
            <div class="ul-about-imgs">
              <div class="img-wrapper"><img src="/assets/img/about-img.png" alt="" /></div>
            </div>
          </div>
          <div class="col">
            <div class="ul-about-txt">
              <span class="ul-section-sub-title">About US</span>
              <h2 class="ul-section-title">{{ site.aboutTitle }}</h2>
              <p class="ul-section-descr">{{ site.aboutText }}</p>
              <p class="ul-section-descr">
                This phase is the public website. Campaigns, stories, events, and team notes live in one content file so they can move into Supabase without a redesign.
              </p>
              <a routerLink="/team" class="ul-btn">
                <i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Meet the team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="ul-stats ul-section-spacing">
      <div class="ul-container">
        <div class="ul-stats-wrapper">
          <div class="row row-cols-md-4 row-cols-2 ul-bs-row">
            @for (stat of stats; track stat.label) {
              <div class="col">
                <div class="ul-stats-item">
                  <i [class]="stat.icon"></i>
                  <span class="number">{{ stat.number }}</span>
                  <span class="txt">{{ stat.label }}</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AboutPage {
  protected readonly site = site;
  protected readonly stats = stats;
}

@Component({
  selector: 'app-services',
  imports: [PageBanner, ServiceCard],
  template: `
    <app-page-banner title="Services" />
    <section class="ul-section-spacing">
      <div class="ul-container">
        <div class="row row-cols-lg-4 row-cols-md-2 row-cols-1 gy-4">
          @for (item of services; track item.slug) {
            <div class="col"><app-service-card [item]="item" /></div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ServicesPage {
  protected readonly services = services;
}

@Component({
  selector: 'app-service-detail',
  imports: [PageBanner, Article, NotFoundPage],
  template: `
    @if (item(); as item) {
      <app-page-banner [title]="item.title" current="Service" />
      <app-article [image]="item.image" [title]="item.title">
        @for (paragraph of item.body; track paragraph) {
          <p class="ul-section-descr">{{ paragraph }}</p>
        }
      </app-article>
    } @else {
      <app-not-found />
    }
  `,
})
export class ServiceDetailPage {
  private readonly slug = routeSlug();
  protected readonly item = computed(() => services.find((entry) => entry.slug === this.slug()) ?? null);
}

@Component({
  selector: 'app-projects',
  imports: [PageBanner, ProjectCard],
  template: `
    <app-page-banner title="Projects" />
    <section class="ul-projects ul-section-spacing">
      <div class="ul-container">
        <div class="row ul-bs-row justify-content-center">
          @for (item of projects; track item.slug) {
            <div [class]="item.wide ? 'col-lg-8 col-md-6 col-12' : 'col-lg-4 col-md-6 col-12'">
              <app-project-card [item]="item" />
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ProjectsPage {
  protected readonly projects = projects;
}

@Component({
  selector: 'app-project-detail',
  imports: [PageBanner, Article, NotFoundPage],
  template: `
    @if (item(); as item) {
      <app-page-banner [title]="item.title" current="Project" />
      <app-article [image]="item.image" [title]="item.title">
        <p class="ul-section-descr">{{ item.category }}</p>
        @for (paragraph of item.body; track paragraph) {
          <p class="ul-section-descr">{{ paragraph }}</p>
        }
      </app-article>
    } @else {
      <app-not-found />
    }
  `,
})
export class ProjectDetailPage {
  private readonly slug = routeSlug();
  protected readonly item = computed(() => projects.find((entry) => entry.slug === this.slug()) ?? null);
}

@Component({
  selector: 'app-donations',
  imports: [PageBanner, DonationCard],
  template: `
    <app-page-banner title="Donations" />
    <section class="ul-section-spacing">
      <div class="ul-container">
        <div class="row row-cols-lg-3 row-cols-md-2 row-cols-1 gy-4">
          @for (item of campaigns; track item.slug) {
            <div class="col"><app-donation-card [item]="item" /></div>
          }
        </div>
      </div>
    </section>
  `,
})
export class DonationsPage {
  protected readonly campaigns = campaigns;
}

@Component({
  selector: 'app-donation-detail',
  imports: [PageBanner, DonateForm, NotFoundPage],
  template: `
    @if (item(); as item) {
      <app-page-banner [title]="item.title" current="Donation" />
      <section class="ul-section-spacing">
        <div class="ul-container">
          <div class="row gy-4 align-items-start">
            <div class="col-lg-7">
              <img [src]="item.image" alt="" class="detail-photo detail-photo--flat" />
              <div class="ul-donation-progress progress-gap">
                <div class="donation-progress-container ul-progress-container">
                  <div class="donation-progressbar ul-progressbar" [attr.data-ul-progress-value]="pct()">
                    <div class="donation-progress-label ul-progress-label"></div>
                  </div>
                </div>
                <div class="ul-donation-progress-labels">
                  <span class="ul-donation-progress-label">Raised : {{ money(item.raised) }}</span>
                  <span class="ul-donation-progress-label">Goal : {{ money(item.goal) }}</span>
                </div>
              </div>
              @for (paragraph of item.body; track paragraph) {
                <p class="ul-section-descr">{{ paragraph }}</p>
              }
            </div>
            <div class="col-lg-5">
              <div class="ul-donate-form-wrapper">
                <h3 class="ul-donate-form-title">Choose an amount</h3>
                <p class="ul-section-descr">{{ item.excerpt }}</p>
                <app-donate-form [campaign]="item.title" />
              </div>
            </div>
          </div>
        </div>
      </section>
    } @else {
      <app-not-found />
    }
  `,
})
export class DonationDetailPage {
  private readonly slug = routeSlug();
  protected readonly item = computed(() => campaigns.find((entry) => entry.slug === this.slug()) ?? null);
  protected readonly money = money;
  protected readonly pct = computed(() => {
    const item = this.item();
    return item ? progress(item.raised, item.goal) : 0;
  });
}

@Component({
  selector: 'app-events',
  imports: [PageBanner, EventCard],
  template: `
    <app-page-banner title="Events" />
    <section class="ul-events ul-section-spacing">
      <div class="ul-container">
        <div class="ul-events-wrapper">
          <div class="row ul-bs-row row-cols-lg-2 row-cols-1">
            @for (item of events; track item.slug) {
              <div class="col"><app-event-card [item]="item" /></div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class EventsPage {
  protected readonly events = events;
}

@Component({
  selector: 'app-event-detail-page',
  imports: [PageBanner, EventDetail, NotFoundPage],
  template: `
    @if (item(); as item) {
      <app-page-banner title="Event Details" current="Event Details" />
      <app-event-detail [event]="item" />
    } @else {
      <app-not-found />
    }
  `,
})
export class EventDetailPage {
  private readonly slug = routeSlug();
  protected readonly item = computed(() => events.find((entry) => entry.slug === this.slug()) ?? null);
}

@Component({
  selector: 'app-team',
  imports: [PageBanner, MemberCard],
  template: `
    <app-page-banner title="Our Team" />
    <section class="ul-team ul-section-spacing">
      <div class="ul-container">
        <div class="row row-cols-md-4 row-cols-sm-2 row-cols-1 ul-team-row">
          @for (item of members; track item.slug) {
            <div class="col"><app-member-card [item]="item" /></div>
          }
        </div>
      </div>
    </section>
  `,
})
export class TeamPage {
  protected readonly members = members;
}

@Component({
  selector: 'app-team-detail',
  imports: [PageBanner, Article, NotFoundPage],
  template: `
    @if (item(); as item) {
      <app-page-banner [title]="item.name" current="Team" />
      <app-article [image]="item.image" [title]="item.name">
        <p class="ul-section-descr">{{ item.role }}</p>
        @for (paragraph of item.bio; track paragraph) {
          <p class="ul-section-descr">{{ paragraph }}</p>
        }
      </app-article>
    } @else {
      <app-not-found />
    }
  `,
})
export class TeamDetailPage {
  private readonly slug = routeSlug();
  protected readonly item = computed(() => members.find((entry) => entry.slug === this.slug()) ?? null);
}

@Component({
  selector: 'app-blog',
  imports: [PageBanner, PostCard],
  template: `
    <app-page-banner title="Stories" />
    <section class="ul-blogs-2 ul-section-spacing">
      <div class="ul-container">
        <div class="row row-cols-md-3 row-cols-1 ul-bs-row">
          @for (item of posts; track item.slug) {
            <div class="col">
              <div class="ul-blog ul-blog-2"><app-post-card [item]="item" /></div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class BlogPage {
  protected readonly posts = posts;
}

@Component({
  selector: 'app-blog-detail',
  imports: [PageBanner, BlogPost, NotFoundPage],
  template: `
    @if (item(); as item) {
      <app-page-banner title="Blog Details" current="Blog Details" />
      <app-blog-post [post]="item" />
    } @else {
      <app-not-found />
    }
  `,
})
export class BlogDetailPage {
  private readonly slug = routeSlug();
  protected readonly item = computed(() => posts.find((entry) => entry.slug === this.slug()) ?? null);
}

@Component({
  selector: 'app-faq',
  imports: [PageBanner],
  template: `
    <app-page-banner title="FAQs" />
    <section class="ul-section-spacing">
      <div class="ul-container">
        <div class="ul-accordion">
          @for (item of faqs; track item.question; let index = $index) {
            <div class="ul-single-accordion-item" [class.open]="open() === index">
              <button type="button" class="ul-single-accordion-item__header accordion-trigger" (click)="toggle(index)">
                <div class="left">
                  <h3 class="ul-single-accordion-item__title">{{ item.question }}</h3>
                </div>
                <span class="icon"><i class="flaticon-next"></i></span>
              </button>
              <div class="ul-single-accordion-item__body">
                <p>{{ item.answer }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class FaqPage {
  protected readonly faqs = faqs;
  protected readonly open = signal(0);

  protected toggle(index: number) {
    this.open.update((current) => (current === index ? -1 : index));
  }
}

@Component({
  selector: 'app-contact',
  imports: [PageBanner, ContactForm],
  template: `
    <app-page-banner title="Contact us" />
    <section class="ul-contact ul-section-spacing">
      <div class="ul-container">
        <div class="row g-0">
          <div class="col-lg-5">
            <div class="ul-contact-img"><img src="/assets/img/contact-img.jpg" alt="" /></div>
          </div>
          <div class="col-lg-7">
            <div class="ul-contact-form-wrapper">
              <span class="ul-section-sub-title">Contact us</span>
              <h2 class="ul-section-title">Send Us a Message</h2>
              <app-contact-form />
            </div>
          </div>
        </div>
        <div class="ul-footer-top-contact-infos contact-extra">
          <p>{{ site.address }}</p>
          <p><a [href]="'mailto:' + site.email">{{ site.email }}</a></p>
          <p><a [href]="site.phoneHref">{{ site.phone }}</a></p>
        </div>
      </div>
    </section>
  `,
})
export class ContactPage {
  protected readonly site = site;
}
