import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { posts, site } from '../../data/content';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, FormsModule],
  template: `
    <footer class="ul-footer">
      <div class="ul-footer-top">
        <div class="ul-footer-container">
          <div class="ul-footer-top-contact-infos">
            <div class="ul-footer-top-contact-info">
              <div class="ul-footer-top-contact-info-icon">
                <div class="ul-footer-top-contact-info-icon-inner"><i class="flaticon-pin"></i></div>
              </div>
              <div class="ul-footer-top-contact-info-txt">
                <span class="ul-footer-top-contact-info-label">Address</span>
                <h5 class="ul-footer-top-contact-info-address">{{ site.address }}</h5>
              </div>
            </div>
            <div class="ul-footer-top-contact-info">
              <div class="ul-footer-top-contact-info-icon">
                <div class="ul-footer-top-contact-info-icon-inner"><i class="flaticon-email"></i></div>
              </div>
              <div class="ul-footer-top-contact-info-txt">
                <span class="ul-footer-top-contact-info-label">Send Email</span>
                <h5 class="ul-footer-top-contact-info-address">
                  <a [href]="'mailto:' + site.email">{{ site.email }}</a>
                </h5>
              </div>
            </div>
            <div class="ul-footer-top-contact-info">
              <div class="ul-footer-top-contact-info-icon">
                <div class="ul-footer-top-contact-info-icon-inner"><i class="flaticon-telephone-call-1"></i></div>
              </div>
              <div class="ul-footer-top-contact-info-txt">
                <span class="ul-footer-top-contact-info-label">Call Emergency</span>
                <h5 class="ul-footer-top-contact-info-address">
                  <a [href]="site.phoneHref">{{ site.phone }}</a>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ul-footer-middle">
        <div class="ul-footer-container">
          <div class="ul-footer-middle-wrapper">
            <div class="ul-footer-about">
              <a routerLink="/"><img src="/assets/img/logo-white.svg" alt="Charitics" class="logo" /></a>
              <p class="ul-footer-about-txt">{{ site.footerText }}</p>
              <div class="ul-footer-socials">
                @for (item of site.socials; track item.icon) {
                  <a [href]="item.href"><i [class]="item.icon"></i></a>
                }
              </div>
            </div>

            <div class="ul-footer-widget">
              <h3 class="ul-footer-widget-title">Quick Links</h3>
              <div class="ul-footer-widget-links">
                <a routerLink="/about">About Us</a>
                <a routerLink="/services">Our Services</a>
                <a routerLink="/blog">Our Blogs</a>
                <a routerLink="/faq">FAQ’S</a>
                <a routerLink="/contact">Contact Us</a>
              </div>
            </div>

            <div class="ul-footer-widget ul-footer-recent-posts">
              <h3 class="ul-footer-widget-title">Recent Posts</h3>
              <div class="ul-blog-sidebar-posts">
                @for (post of recent; track post.slug) {
                  <div class="ul-blog-sidebar-post ul-footer-post">
                    <div class="img"><img [src]="post.image" alt="" /></div>
                    <div class="txt">
                      <span class="date">
                        <span class="icon"><i class="flaticon-calendar"></i></span>
                        <span>{{ post.date }}</span>
                      </span>
                      <h4 class="title"><a [routerLink]="['/blog', post.slug]">{{ post.title }}</a></h4>
                    </div>
                  </div>
                }
              </div>
            </div>

            <div class="ul-footer-widget ul-nwsltr-widget">
              <h3 class="ul-footer-widget-title">Contact Us</h3>
              <div class="ul-footer-widget-links ul-footer-contact-links">
                <a [href]="'mailto:' + site.email"><i class="flaticon-mail"></i> {{ site.email }}</a>
                <a [href]="site.phoneHref"><i class="flaticon-telephone-call"></i> {{ site.phone }}</a>
              </div>
              <form class="ul-nwsltr-form" #form (ngSubmit)="onSubmit(form)">
                <div class="top">
                  <input type="email" name="email" placeholder="Your Email Address" class="ul-nwsltr-input" />
                  <button type="submit"><i class="flaticon-next"></i></button>
                </div>
                <div class="agreement">
                  <label class="ul-checkbox-wrapper">
                    <input type="checkbox" name="agreement" hidden />
                    <span class="ul-checkbox"><i class="flaticon-tick"></i></span>
                    <span class="ul-checkbox-txt">I agree to be contacted about this list</span>
                  </label>
                </div>
                @if (note()) {
                  <p class="form-note" [class.ok]="ok()" [class.error]="!ok()">{{ note() }}</p>
                }
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="ul-footer-bottom">
        <div class="ul-footer-container">
          <div class="ul-footer-bottom-wrapper">
            <p class="copyright-txt">&copy; {{ year }} Charitics. All rights reserved</p>
            <div class="ul-footer-bottom-nav">
              <a routerLink="/faq">FAQs</a>
              <a routerLink="/contact">Contact</a>
            </div>
          </div>
        </div>
      </div>
      <div class="ul-footer-vectors">
        <img src="/assets/img/footer-vector-img.png" alt="" class="ul-footer-vector-1" />
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly site = site;
  protected readonly recent = posts.slice(0, 2);
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
