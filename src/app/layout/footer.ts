import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { site } from '../../data/content';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, FormsModule],
  template: `
    <footer class="foot">
      <div class="wrap foot-grid">
        <div>
          <a class="mark" routerLink="/"><span class="mark-sq"></span>Spark 15</a>
          <p style="margin-top: 12px">{{ site.footerText }}</p>
          <p style="margin-top: 12px">{{ site.address }}</p>
        </div>
        <div>
          <h3>Visit</h3>
          <ul>
            <li><a routerLink="/" fragment="about">About</a></li>
            <li><a routerLink="/" fragment="events">Events</a></li>
            <li><a routerLink="/" fragment="blog">Stories</a></li>
            <li><a routerLink="/faq">FAQ</a></li>
            <li><a routerLink="/" fragment="contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3>Write to us</h3>
          <p><a [href]="'mailto:' + site.email">{{ site.email }}</a></p>
          <p><a [href]="site.phoneHref">{{ site.phone }}</a></p>
          <form style="margin-top: 14px" #form (ngSubmit)="onSubmit(form)">
            <div class="finder">
              <input type="email" name="email" placeholder="Email address" />
            </div>
            <label class="check" style="margin: 10px 0">
              <input type="checkbox" name="agreement" />
              <span>I agree to be contacted about this list</span>
            </label>
            <button class="btn" type="submit">Join the list</button>
            @if (note()) {
              <p class="form-note" [class.ok]="ok()" [class.error]="!ok()">{{ note() }}</p>
            }
          </form>
        </div>
      </div>
      <div class="wrap foot-base">
        <span>© {{ year }} Spark 15</span>
        <span><a routerLink="/faq">FAQ</a> · <a routerLink="/" fragment="contact">Contact</a></span>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly site = site;
  protected readonly year = new Date().getFullYear();
  protected readonly note = signal('');
  protected readonly ok = signal(false);

  protected onSubmit(form: HTMLFormElement) {
    const data = new FormData(form);
    const email = String(data.get('email') || '');
    const agreed = data.get('agreement') === 'on';
    if (!email.includes('@') || !agreed) {
      this.ok.set(false);
      this.note.set('Add a valid email and agree to the privacy note.');
      return;
    }
    this.ok.set(true);
    this.note.set('You are on the list for this browser session. It will be stored in the next phase.');
    form.reset();
  }
}
