import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { campaigns, events, faqs, members, money, posts, progress, projects, services, site, stats } from '../../data/content';
import { EventDetail } from '../events/event-detail';
import { BlogPost } from '../blog/blog-post';
import { Article, ContactForm, DonateForm, DonationCard, EventCard, MemberCard, PageBanner, PostCard, ProjectCard, ServiceCard } from '../shared/cards';

function routeSlug() {
  const route = inject(ActivatedRoute);
  return toSignal(route.paramMap.pipe(map((params) => params.get('slug') ?? '')), { initialValue: '' });
}

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="wrap not-found">
      <h1>That page is not on this site</h1>
      <p class="lede" style="margin: 12px auto 18px">The link may be old, or the page has not been published.</p>
      <a routerLink="/" class="btn">Back home</a>
    </section>
  `,
})
export class NotFoundPage {}

@Component({
  selector: 'app-about',
  imports: [RouterLink, PageBanner],
  template: `
    <app-page-banner title="Who we are" />
    <section class="section">
      <div class="wrap split">
        <img src="/assets/img/project-1.jpg" alt="" />
        <div>
          <span class="kicker">About</span>
          <h2>{{ site.aboutTitle }}</h2>
          <p class="lede" style="margin-top: 14px">{{ site.aboutText }}</p>
          <p class="lede" style="margin: 12px 0 18px">The same introduction, activities, and news are on the home page.</p>
          <a routerLink="/team" class="btn teal">Meet the team</a>
        </div>
      </div>
    </section>
    <div class="wrap" style="padding-bottom: 72px">
      <div class="facts">
        @for (stat of stats; track stat.label) {
          <div><strong>{{ stat.number }}</strong><span>{{ stat.label }}</span></div>
        }
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
    <section class="section">
      <div class="wrap grid-2">
        @for (item of services; track item.slug) {
          <app-service-card [item]="item" />
        }
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
          <p>{{ paragraph }}</p>
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
    <section class="section">
      <div class="wrap grid-2">
        @for (item of projects; track item.slug) {
          <app-project-card [item]="item" />
        }
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
        <p class="tag">{{ item.category }}</p>
        @for (paragraph of item.body; track paragraph) {
          <p>{{ paragraph }}</p>
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
    <app-page-banner title="Donate" />
    <section class="section">
      <div class="wrap grid-2">
        @for (item of campaigns; track item.slug) {
          <app-donation-card [item]="item" />
        }
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
      <app-page-banner [title]="item.title" current="Donate" />
      <section class="section">
        <div class="wrap split">
          <article class="prose">
            <img class="cover" [src]="item.image" alt="" style="border-radius: 4px" />
            @if (item.goal) {
              <div class="meter"><span [style.width.%]="pct()"></span></div>
              <div class="meta">
                <span>Raised {{ money(item.raised) }}</span>
                <span>Goal {{ money(item.goal) }}</span>
              </div>
            }
            @for (paragraph of item.body; track paragraph) {
              <p>{{ paragraph }}</p>
            }
          </article>
          <aside class="panel">
            <h2 style="font-size: 32px; margin-bottom: 8px">Give by bank transfer</h2>
            <p class="lede" style="margin-bottom: 16px">{{ item.excerpt }}</p>
            <app-donate-form [campaign]="item.title" />
          </aside>
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
    <section class="section">
      <div class="wrap">
        @for (item of events; track item.slug) {
          <app-event-card [item]="item" />
        }
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
      <app-page-banner title="Event" current="Event" />
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
    <app-page-banner title="Team" />
    <section class="section">
      <div class="wrap grid-4">
        @for (item of members; track item.slug) {
          <app-member-card [item]="item" />
        }
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
        <p class="tag">{{ item.role }}</p>
        @for (paragraph of item.bio; track paragraph) {
          <p>{{ paragraph }}</p>
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
    <section class="section">
      <div class="wrap grid-3">
        @for (item of posts; track item.slug) {
          <app-post-card [item]="item" />
        }
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
      <app-page-banner title="Story" current="Story" />
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
    <app-page-banner title="Questions" />
    <section class="section">
      <div class="wrap faq">
        @for (item of faqs; track item.question; let index = $index) {
          <div [class.open]="open() === index">
            <button type="button" (click)="toggle(index)">
              <h3>{{ item.question }}</h3>
              <span>{{ open() === index ? '–' : '+' }}</span>
            </button>
            @if (open() === index) {
              <p>{{ item.answer }}</p>
            }
          </div>
        }
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
    <app-page-banner title="Contact" />
    <section class="section">
      <div class="wrap split">
        <div>
          <span class="kicker">Write or call</span>
          <h2>Send a message about a gift or a visit</h2>
          <div class="stack">
            <div>{{ site.address }}</div>
            <div><a [href]="'mailto:' + site.email">{{ site.email }}</a></div>
            <div><a [href]="site.phoneHref">{{ site.phone }}</a></div>
          </div>
        </div>
        <div class="panel">
          <app-contact-form />
        </div>
      </div>
    </section>
  `,
})
export class ContactPage {
  protected readonly site = site;
}
