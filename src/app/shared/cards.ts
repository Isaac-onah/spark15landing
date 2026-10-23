import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  Campaign,
  EventItem,
  Member,
  Post,
  Project,
  Service,
  money,
  progress,
} from '../../data/content';

@Component({
  selector: 'app-donation-card',
  imports: [RouterLink],
  template: `
    <div class="ul-donation">
      <div class="ul-donation-img">
        <img [src]="item().image" alt="" />
        <span class="tag">{{ item().category }}</span>
      </div>
      <div class="ul-donation-txt">
        <div class="ul-donation-progress">
          <div class="donation-progress-container ul-progress-container">
            <div class="donation-progressbar ul-progressbar" [attr.data-ul-progress-value]="pct()">
              <div class="donation-progress-label ul-progress-label"></div>
            </div>
          </div>
          <div class="ul-donation-progress-labels">
            <span class="ul-donation-progress-label">Raised : {{ money(item().raised) }}</span>
            <span class="ul-donation-progress-label">Goal : {{ money(item().goal) }}</span>
          </div>
        </div>
        <a [routerLink]="['/donations', item().slug]" class="ul-donation-title">{{ item().title }}</a>
        <p class="ul-donation-descr">{{ item().excerpt }}</p>
        <a [routerLink]="['/donations', item().slug]" class="ul-donation-btn">
          Donate now <i class="flaticon-up-right-arrow"></i>
        </a>
      </div>
    </div>
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
    <div class="ul-service">
      <div class="ul-service-img"><img [src]="item().image" alt="" /></div>
      <div class="ul-service-txt">
        <h3 class="ul-service-title"><a [routerLink]="['/services', item().slug]">{{ item().title }}</a></h3>
        <p class="ul-service-descr">{{ item().excerpt }}</p>
        <a [routerLink]="['/services', item().slug]" class="ul-service-btn">
          <i class="flaticon-up-right-arrow"></i> View Details
        </a>
      </div>
    </div>
  `,
})
export class ServiceCard {
  readonly item = input.required<Service>();
}

@Component({
  selector: 'app-event-card',
  imports: [RouterLink],
  template: `
    <div class="ul-event">
      <div class="ul-event-img">
        <img [src]="item().image" alt="" />
        <span class="date">{{ item().day }} <span>{{ item().month }}</span></span>
      </div>
      <div class="ul-event-txt">
        <h3 class="ul-event-title"><a [routerLink]="['/events', item().slug]">{{ item().title }}</a></h3>
        <p class="ul-event-descr">{{ item().excerpt }}</p>
        <div class="ul-event-info">
          <span class="ul-event-info-title">Venue</span>
          <p class="ul-event-info-descr">{{ item().venue }}</p>
        </div>
        <a [routerLink]="['/events', item().slug]" class="ul-btn">
          <i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Event Details
        </a>
      </div>
    </div>
  `,
})
export class EventCard {
  readonly item = input.required<EventItem>();
}

@Component({
  selector: 'app-member-card',
  imports: [RouterLink],
  template: `
    <div class="ul-team-member">
      <div class="ul-team-member-img">
        <img [src]="item().image" alt="" />
        <div class="ul-team-member-socials">
          <a href="#"><i class="flaticon-facebook"></i></a>
          <a href="#"><i class="flaticon-twitter"></i></a>
          <a href="#"><i class="flaticon-linkedin-big-logo"></i></a>
          <a href="#"><i class="flaticon-instagram"></i></a>
        </div>
      </div>
      <div class="ul-team-member-info">
        <h3 class="ul-team-member-name"><a [routerLink]="['/team', item().slug]">{{ item().name }}</a></h3>
        <p class="ul-team-member-designation">{{ item().role }}</p>
      </div>
    </div>
  `,
})
export class MemberCard {
  readonly item = input.required<Member>();
}

@Component({
  selector: 'app-post-card',
  imports: [RouterLink],
  template: `
    <div class="ul-blog">
      <div class="ul-blog-img">
        <img [src]="item().image" alt="" />
        <div class="date">
          <span class="number">{{ item().day }}</span>
          <span class="txt">{{ item().month }}</span>
        </div>
      </div>
      <div class="ul-blog-txt">
        <div class="ul-blog-infos">
          <div class="ul-blog-info">
            <span class="icon"><i class="flaticon-account"></i></span>
            <span class="text">{{ item().author }}</span>
          </div>
          <div class="ul-blog-info">
            <span class="icon"><i class="flaticon-price-tag"></i></span>
            <span class="text">{{ item().category }}</span>
          </div>
        </div>
        <a [routerLink]="['/blog', item().slug]" class="ul-blog-title">{{ item().title }}</a>
        <a [routerLink]="['/blog', item().slug]" class="ul-blog-btn">
          Read More <span class="icon"><i class="flaticon-next"></i></span>
        </a>
      </div>
    </div>
  `,
})
export class PostCard {
  readonly item = input.required<Post>();
}

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  template: `
    <div class="ul-project" [class.ul-project--sm]="!item().wide">
      <div class="ul-project-img"><img [src]="item().image" alt="" /></div>
      <div class="ul-project-txt">
        <div>
          <h3 class="ul-project-title"><a [routerLink]="['/projects', item().slug]">{{ item().title }}</a></h3>
          <p class="ul-project-descr">{{ item().category }}</p>
        </div>
        <a [routerLink]="['/projects', item().slug]" class="ul-project-btn">
          <i class="flaticon-up-right-arrow"></i>
        </a>
      </div>
    </div>
  `,
})
export class ProjectCard {
  readonly item = input.required<Project>();
}

@Component({
  selector: 'app-page-banner',
  imports: [RouterLink],
  template: `
    <section class="ul-breadcrumb ul-section-spacing">
      <div class="ul-container">
        <h2 class="ul-breadcrumb-title">{{ title() }}</h2>
        <ul class="ul-breadcrumb-nav">
          <li><a routerLink="/">Home</a></li>
          <li><span class="separator"><i class="flaticon-right"></i></span></li>
          <li>{{ current() || title() }}</li>
        </ul>
      </div>
    </section>
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
    <section class="ul-section-spacing">
      <div class="ul-container">
        <div class="row gy-4">
          <div class="col-lg-8">
            <img [src]="image()" alt="" class="detail-photo" />
            <h2 class="ul-section-title">{{ title() }}</h2>
            <ng-content />
          </div>
          <div class="col-lg-4">
            <div class="ul-footer-widget">
              <h3 class="ul-footer-widget-title">Keep going</h3>
              <div class="ul-footer-widget-links">
                <a routerLink="/donations">Campaigns</a>
                <a routerLink="/events">Events</a>
                <a routerLink="/blog">Stories</a>
                <a routerLink="/contact">Contact</a>
              </div>
            </div>
          </div>
        </div>
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
    <form class="ul-contact-form" #form (ngSubmit)="onSubmit(form)">
      <div class="row row-cols-2 row-cols-xxs-1 ul-bs-row">
        <div class="col"><div class="form-group"><input type="text" name="name" placeholder="Your Name" /></div></div>
        <div class="col"><div class="form-group"><input type="email" name="email" placeholder="Email Address" /></div></div>
        <div class="col"><div class="form-group"><input type="tel" name="phone" placeholder="Phone Number" /></div></div>
        <div class="col"><div class="form-group"><input type="text" name="subject" placeholder="Subject" /></div></div>
        <div class="col-12"><div class="form-group"><textarea name="message" placeholder="Type your message"></textarea></div></div>
        <div class="col-12">
          <button class="ul-btn" type="submit">
            <i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Send Message
          </button>
          @if (note()) {
            <p class="form-note" [class.ok]="ok()" [class.error]="!ok()">{{ note() }}</p>
          }
        </div>
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
    this.note.set('Message received on this page. It will be saved when the site is connected to Supabase.');
    form.reset();
  }
}

@Component({
  selector: 'app-donate-form',
  imports: [FormsModule],
  template: `
    <form class="ul-donate-form ul-donate-form-2" (ngSubmit)="onSubmit()">
      @for (value of amounts; track value) {
        <div>
          <input
            type="radio"
            name="donate-amount"
            [id]="'donate-amount-' + value"
            [checked]="!custom() && amount() === value"
            (change)="pick(value)"
            hidden
          />
          <label [attr.for]="'donate-amount-' + value" class="ul-donate-form-label">{{ '$' + value }}</label>
        </div>
      }
      <div class="custom-amount-wrapper">
        <input type="radio" name="donate-amount" id="custom-amount" [checked]="!!custom()" />
        <label for="custom-amount" class="ul-donate-form-label">
          <input
            type="number"
            min="1"
            [value]="custom()"
            placeholder="Custom Amount"
            class="ul-donate-form-custom-input"
            (input)="custom.set(inputValue($event))"
          />
        </label>
      </div>
      <div>
        <button type="submit" class="ul-btn">
          <i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Donate Now
        </button>
      </div>
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
  protected readonly money = money;

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
      this.note.set('Enter an amount of at least $1.');
      return;
    }
    this.ok.set(true);
    this.note.set(`${money(chosen)} for ${this.campaign()} is noted on this page only. Card payments connect in the next phase.`);
  }
}
