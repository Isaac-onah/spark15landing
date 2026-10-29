import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Campaign, EventItem, Member, Post, Project, Service, money, progress, site } from '../../data/content';

@Component({
  selector: 'app-donation-card',
  imports: [RouterLink],
  template: `
    <article class="card">
      <img class="cover" [src]="item().image" alt="" />
      <div class="card-body">
        <span class="tag">{{ item().category }}</span>
        <h3><a [routerLink]="['/donations', item().slug]">{{ item().title }}</a></h3>
        <p>{{ item().excerpt }}</p>
        @if (item().goal) {
          <div class="meter"><span [style.width.%]="pct()"></span></div>
          <div class="meta">
            <span>Raised {{ money(item().raised) }}</span>
            <span>Goal {{ money(item().goal) }}</span>
          </div>
        }
        <a class="more" [routerLink]="['/donations', item().slug]">How to give</a>
      </div>
    </article>
  `,
})
export class DonationCard {
  readonly item = input.required<Campaign>();
  protected readonly money = money;
  protected pct = () => progress(this.item().raised, this.item().goal);
}

@Component({
  selector: 'app-service-card',
  imports: [RouterLink],
  template: `
    <article class="card">
      <img class="cover" [src]="item().image" alt="" />
      <div class="card-body">
        <h3><a [routerLink]="['/services', item().slug]">{{ item().title }}</a></h3>
        <p>{{ item().excerpt }}</p>
        <a class="more" [routerLink]="['/services', item().slug]">Read the service</a>
      </div>
    </article>
  `,
})
export class ServiceCard {
  readonly item = input.required<Service>();
}

@Component({
  selector: 'app-event-card',
  imports: [RouterLink],
  template: `
    <article class="event-row">
      <div class="event-media">
        <img class="event-photo" [src]="item().image" alt="" />
        <div class="event-date">
          <b>{{ item().day }}</b>
          <span>{{ item().month }}</span>
        </div>
      </div>
      <div class="event-copy">
        <h3><a [routerLink]="['/events', item().slug]">{{ item().title }}</a></h3>
        <p>{{ item().venue }}</p>
      </div>
      <a class="btn line" [routerLink]="['/events', item().slug]">Details</a>
    </article>
  `,
})
export class EventCard {
  readonly item = input.required<EventItem>();
}

@Component({
  selector: 'app-member-card',
  imports: [RouterLink],
  template: `
    <article class="person">
      <div class="person-photo">
        <a [routerLink]="['/team', item().slug]"><img [src]="item().image" alt="" /></a>
        <div class="person-social">
          @for (social of socials; track social.label) {
            <a [href]="social.href" [attr.aria-label]="social.label" (click)="hold($event)">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path [attr.d]="social.icon" fill-rule="evenodd" />
              </svg>
            </a>
          }
        </div>
      </div>
      <div class="person-copy">
        <h3>
          <a [routerLink]="['/team', item().slug]">
            <b>{{ given() }}</b>
            @if (family()) {
              <span> {{ family() }}</span>
            }
          </a>
        </h3>
        <p>{{ item().role }}</p>
      </div>
    </article>
  `,
})
export class MemberCard {
  readonly item = input.required<Member>();
  protected readonly socials = [
    {
      label: 'Facebook',
      href: site.socials[0]?.href ?? '#',
      icon: 'M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z',
    },
    {
      label: 'X',
      href: site.socials[1]?.href ?? '#',
      icon: 'M14.7 10.3 22 2h-2.2l-6.3 7.2L8.2 2H2l7.7 11.2L2 22h2.2l6.8-7.8L15.6 22H22l-7.3-11.7Zm-2.4 2.8-.8-1.1L5 3.5h2.7l5 7.2.8 1.1 6.5 9.2h-2.7l-5.4-7.9Z',
    },
    {
      label: 'Instagram',
      href: site.socials[2]?.href ?? '#',
      icon: 'M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm8 2H8a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3zm-4 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2zM17.4 6.6a1 1 0 1 1-1 1 1 1 0 0 1 1-1z',
    },
  ];

  protected given() {
    return this.item().name.split(' ')[0] ?? '';
  }

  protected family() {
    return this.item().name.split(' ').slice(1).join(' ');
  }

  protected hold(event: Event) {
    const link = event.currentTarget as HTMLAnchorElement | null;
    if (link?.getAttribute('href') === '#') event.preventDefault();
  }
}

@Component({
  selector: 'app-post-card',
  imports: [RouterLink],
  template: `
    <article class="card story">
      <img class="cover" [src]="item().image" alt="" />
      <div class="card-body">
        <span class="tag">{{ item().category }} · {{ item().day }} {{ item().month }}</span>
        <h3><a [routerLink]="['/blog', item().slug]">{{ item().title }}</a></h3>
        <a class="more" [routerLink]="['/blog', item().slug]">Read the story</a>
      </div>
    </article>
  `,
})
export class PostCard {
  readonly item = input.required<Post>();
}

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  template: `
    <article class="card">
      <img class="cover" [src]="item().image" alt="" />
      <div class="card-body">
        <span class="tag">{{ item().category }}</span>
        <h3><a [routerLink]="['/projects', item().slug]">{{ item().title }}</a></h3>
        <p>{{ item().excerpt }}</p>
      </div>
    </article>
  `,
})
export class ProjectCard {
  readonly item = input.required<Project>();
}

@Component({
  selector: 'app-page-banner',
  imports: [RouterLink],
  template: `
    <div class="page-title">
      <div class="wrap">
        <p class="crumbs"><a routerLink="/">Home</a> / {{ current() || title() }}</p>
        <h1>{{ title() }}</h1>
      </div>
    </div>
  `,
})
export class PageBanner {
  readonly title = input.required<string>();
  readonly current = input<string>();
}

@Component({
  selector: 'app-article',
  imports: [RouterLink],
  template: `
    <section class="section">
      <div class="wrap layout">
        <aside class="side">
          <div class="panel">
            <h3>Keep going</h3>
            <div class="side-nav">
              <a routerLink="/donations">Campaigns</a>
              <a routerLink="/events">Events</a>
              <a routerLink="/blog">Stories</a>
              <a routerLink="/contact">Contact</a>
            </div>
          </div>
        </aside>
        <article class="article prose">
          <img class="cover" [src]="image()" alt="" />
          <h2>{{ title() }}</h2>
          <ng-content />
        </article>
      </div>
    </section>
  `,
})
export class Article {
  readonly image = input.required<string>();
  readonly title = input.required<string>();
}

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule],
  template: `
    <form class="form" #form (ngSubmit)="onSubmit(form)">
      <label class="field"><input type="text" name="name" placeholder="Your name" /></label>
      <label class="field"><input type="email" name="email" placeholder="Email address" /></label>
      <label class="field"><input type="tel" name="phone" placeholder="Phone number" /></label>
      <label class="field"><input type="text" name="subject" placeholder="Subject" /></label>
      <label class="field wide"><textarea name="message" placeholder="Your message"></textarea></label>
      <div class="wide">
        <button class="btn" type="submit">Send message</button>
        @if (note()) {
          <p class="form-note" [class.ok]="ok()" [class.error]="!ok()">{{ note() }}</p>
        }
      </div>
    </form>
  `,
})
export class ContactForm {
  protected readonly note = signal('');
  protected readonly ok = signal(false);

  protected onSubmit(form: HTMLFormElement) {
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !email.includes('@') || message.length < 10) {
      this.ok.set(false);
      this.note.set('Add your name, a valid email, and a message of at least 10 characters.');
      return;
    }
    this.ok.set(true);
    this.note.set('Message received on this page. For a reply now, write to sparkfif@gmail.com.');
    form.reset();
  }
}

@Component({
  selector: 'app-donate-form',
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <div class="amounts">
        @for (value of amounts; track value) {
          <div>
            <input type="radio" name="donate-amount" [id]="'donate-amount-' + value" [checked]="!custom() && amount() === value" (change)="pick(value)" />
            <label [attr.for]="'donate-amount-' + value">{{ '€' + value }}</label>
          </div>
        }
        <label>
          <input type="number" min="1" [value]="custom()" placeholder="Other" class="amount-custom" (input)="custom.set(inputValue($event))" />
        </label>
      </div>
      <button class="btn" type="submit" style="margin-top: 14px">Donate now</button>
      @if (note()) {
        <p class="form-note" [class.ok]="ok()" [class.error]="!ok()">{{ note() }}</p>
      }
    </form>
  `,
})
export class DonateForm {
  readonly campaign = input.required<string>();
  protected readonly amounts = [10, 20, 30, 50, 100];
  protected readonly amount = signal(20);
  protected readonly custom = signal('');
  protected readonly note = signal('');
  protected readonly ok = signal(false);

  protected pick(value: number) {
    this.amount.set(value);
    this.custom.set('');
  }

  protected inputValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }

  protected onSubmit() {
    const chosen = this.custom() ? Number(this.custom()) : this.amount();
    if (!chosen || chosen < 1) {
      this.ok.set(false);
      this.note.set('Enter an amount of at least €1.');
      return;
    }
    this.ok.set(true);
    this.note.set(`€${chosen} for ${this.campaign()} is noted on this page only. Spark15 cannot take a card payment here. Transfer to SPARK15 at APS Bank, IBAN MT63APSB77013000000045347010012, BIC APSBMTMT.`);
  }
}
