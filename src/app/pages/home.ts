import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  campaigns,
  events,
  features,
  members,
  posts,
  services,
  site,
  slides,
  stats,
  testimonials,
} from '../../data/content';
import { ContactForm, DonationCard, EventCard, MemberCard, PostCard, ServiceCard } from '../shared/cards';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ContactForm, DonationCard, EventCard, MemberCard, PostCard, ServiceCard],
  template: `
    <section class="ul-banner ul-banner-2">
      <div class="ul-banner-2-slider swiper">
        <div class="swiper-wrapper">
          @for (slide of slides; track slide.image) {
            <div class="swiper-slide">
              <div class="ul-banner-2-slide">
                <img [src]="slide.image" alt="" class="ul-banner-2-slide-bg-img" />
                <div class="row gy-4 align-items-center">
                  <div class="col-md-7">
                    <div class="ul-banner-txt">
                      <span class="ul-banner-sub-title ul-section-sub-title">{{ slide.kicker }}</span>
                      <h1 class="ul-banner-title">{{ slide.title }}</h1>
                      <p class="ul-banner-descr">{{ slide.text }}</p>
                      <div class="ul-banner-btns">
                        <a routerLink="/donations" class="ul-btn">
                          <i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Make Donation
                        </a>
                        <a routerLink="/contact" class="ul-btn">
                          <i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Join With us
                        </a>
                        <div class="ul-banner-stat">
                          <div class="imgs">
                            <img src="/assets/img/user-1.png" alt="" />
                            <img src="/assets/img/user-3.png" alt="" />
                            <img src="/assets/img/user-2.png" alt="" />
                            <span class="number">{{ site.donorLabel }}</span>
                          </div>
                          <span class="txt">{{ site.donorText }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <div class="ul-banner-2-slider-navigation">
        <button class="prev" type="button"><img src="/assets/img/left-arrow.svg" alt="Previous" /></button>
        <div class="ul-banner-2-thumb-slider swiper">
          <div class="swiper-wrapper">
            @for (slide of slides; track slide.image) {
              <div class="swiper-slide"><img [src]="slide.image" alt="" /></div>
            }
          </div>
        </div>
        <button class="next" type="button"><img src="/assets/img/right-arrow.svg" alt="Next" /></button>
      </div>
    </section>

    <section class="ul-features ul-section-spacing">
      <div class="ul-container">
        <div class="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4 justify-content-center">
          @for (feature of features; track feature.title) {
            <div class="col">
              <div class="ul-feature">
                <div class="ul-feature-icon"><i [class]="feature.icon"></i></div>
                <h3 class="ul-feature-title">{{ feature.title }}</h3>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="ul-about ul-section-spacing">
      <div class="ul-container">
        <div class="row row-cols-md-2 row-cols-1 align-items-center gy-4 ul-about-row">
          <div class="col">
            <div class="ul-about-imgs">
              <div class="img-wrapper"><img src="/assets/img/about-img.png" alt="" /></div>
              <div class="ul-about-imgs-vectors">
                <img src="/assets/img/about-img-vector-1.svg" alt="" class="vector-1" />
                <img src="/assets/img/about-img-vector-2.svg" alt="" class="vector-2" />
              </div>
            </div>
          </div>
          <div class="col">
            <div class="ul-about-txt">
              <span class="ul-section-sub-title ul-section-sub-title--2">About US</span>
              <h2 class="ul-section-title">{{ site.aboutTitle }}</h2>
              <p class="ul-section-descr">{{ site.aboutText }}</p>
              <div class="ul-about-block">
                <div class="block-left">
                  <div class="block-heading">
                    <div class="icon"><i class="flaticon-love"></i></div>
                    <h3 class="block-title">Start Helping Team</h3>
                  </div>
                  <ul class="block-list">
                    <li>Meals, water, clinics, and training</li>
                    <li>Events you can join this month</li>
                  </ul>
                </div>
                <div class="block-right"><img src="/assets/img/about-block-img.jpg" alt="" /></div>
              </div>
              <div class="ul-about-bottom">
                <a routerLink="/about" class="ul-btn">
                  <i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Explore More
                </a>
                <div class="ul-about-call">
                  <div class="icon"><i class="flaticon-telephone-call"></i></div>
                  <div class="txt">
                    <span class="call-title">Call Any Time</span>
                    <a [href]="site.phoneHref">{{ site.phone }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ul-about-vectors">
        <img src="/assets/img/about-vector-1.png" alt="" class="vector-1" />
      </div>
    </section>

    <section class="ul-donations ul-section-spacing overflow-hidden">
      <div class="ul-container">
        <div class="ul-section-heading ul-donations-heading justify-content-between text-center">
          <div class="left">
            <span class="ul-section-sub-title"><span class="txt">Help &amp; Donate</span></span>
            <h2 class="ul-section-title">Campaigns you can fund this month</h2>
          </div>
          <a routerLink="/donations" class="ul-btn">
            <i class="flaticon-fast-forward-double-right-arrows-symbol"></i> All Campaigns
          </a>
          <div class="ul-slider-nav ul-donations-slider-nav">
            <button class="prev" type="button"><i class="flaticon-back"></i></button>
            <button class="next" type="button"><i class="flaticon-next"></i></button>
          </div>
        </div>
        <div class="ul-donations-slider swiper overflow-visible">
          <div class="swiper-wrapper">
            @for (item of campaigns; track item.slug) {
              <div class="swiper-slide"><app-donation-card [item]="item" /></div>
            }
          </div>
        </div>
      </div>
    </section>

    <div class="ul-stats ul-section-spacing">
      <div class="ul-container">
        <div class="ul-stats-wrapper">
          <div class="row row-cols-md-4 row-cols-sm-3 row-cols-2 row-cols-xxs-1 ul-bs-row justify-content-center">
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

    <section class="ul-services ul-section-spacing overflow-hidden">
      <div class="ul-container">
        <div class="ul-section-heading">
          <div>
            <span class="ul-section-sub-title">Together, We Can Change Lives Forever.</span>
            <h2 class="ul-section-title">Services behind the campaigns</h2>
          </div>
          <div class="ul-services-slider-nav ul-slider-nav position-static">
            <button class="prev" type="button"><i class="flaticon-back"></i></button>
            <button class="next" type="button"><i class="flaticon-next"></i></button>
          </div>
        </div>
        <div class="ul-services-slider swiper overflow-visible">
          <div class="swiper-wrapper">
            @for (item of services; track item.slug) {
              <div class="swiper-slide"><app-service-card [item]="item" /></div>
            }
          </div>
        </div>
      </div>
    </section>

    <section class="ul-events ul-section-spacing pt-0">
      <div class="ul-container">
        <div class="ul-section-heading align-items-center">
          <div class="left">
            <span class="ul-section-sub-title">Upcoming Events</span>
            <h2 class="ul-section-title text-white">Come and work alongside the team</h2>
          </div>
          <a routerLink="/events" class="ul-btn">
            <i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Explore More
          </a>
        </div>
        <div class="ul-events-wrapper">
          <div class="row ul-bs-row row-cols-lg-2 row-cols-1">
            @for (item of events.slice(0, 2); track item.slug) {
              <div class="col"><app-event-card [item]="item" /></div>
            }
          </div>
        </div>
      </div>
      <div class="ul-events-vectors">
        <img src="/assets/img/events-vector-1.png" alt="" class="vector-1" />
        <img src="/assets/img/events-vector-2.svg" alt="" class="vector-2" />
      </div>
    </section>

    <section class="ul-team ul-section-spacing">
      <div class="ul-container">
        <div class="ul-section-heading justify-content-between">
          <div class="left">
            <span class="ul-section-sub-title">Our Team</span>
            <h2 class="ul-section-title">The people who run the programs</h2>
          </div>
          <a routerLink="/team" class="ul-btn">
            <i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Meet the team
          </a>
        </div>
        <div class="row row-cols-md-4 row-cols-sm-3 row-cols-2 row-cols-xxs-1 ul-team-row justify-content-center">
          @for (item of members; track item.slug) {
            <div class="col"><app-member-card [item]="item" /></div>
          }
        </div>
      </div>
    </section>

    <section class="ul-testimonial ul-section-spacing">
      <div class="ul-testimonial-container">
        <div class="ul-section-heading text-center">
          <div>
            <span class="ul-section-sub-title">Testimonials</span>
            <h2 class="ul-section-title">What people say about the work</h2>
          </div>
        </div>
        <div class="ul-testimonial-slider swiper">
          <div class="swiper-wrapper">
            @for (item of testimonials; track item.name) {
              <div class="swiper-slide">
                <div class="ul-review">
                  <div class="ul-review-rating">
                    <i class="flaticon-star"></i><i class="flaticon-star"></i><i class="flaticon-star"></i><i class="flaticon-star"></i><i class="flaticon-star"></i>
                  </div>
                  <p class="ul-review-descr">{{ item.quote }}</p>
                  <div class="ul-review-bottom">
                    <div class="ul-review-reviewer">
                      <div class="reviewer-image"><img [src]="item.image" alt="" /></div>
                      <div>
                        <h3 class="reviewer-name">{{ item.name }}</h3>
                        <span class="reviewer-role">{{ item.role }}</span>
                      </div>
                    </div>
                    <div class="ul-review-icon"><i class="flaticon-left"></i></div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <section class="ul-blogs ul-section-spacing">
      <div class="ul-blogs-container">
        <div class="row gy-3">
          <div class="col-sm-5">
            <div class="ul-section-heading">
              <div class="left">
                <span class="ul-section-sub-title">Latest Blog</span>
                <h2 class="ul-section-title">Read Our Latest News</h2>
                <p class="ul-section-descr">Notes from the meal program, the water sites, and the volunteer days.</p>
                <div class="ul-blogs-slider-nav ul-slider-nav">
                  <button class="prev" type="button"><i class="flaticon-back"></i></button>
                  <button class="next" type="button"><i class="flaticon-next"></i></button>
                </div>
                <a routerLink="/blog" class="ul-btn">
                  <i class="flaticon-fast-forward-double-right-arrows-symbol"></i> All Stories
                </a>
              </div>
            </div>
          </div>
          <div class="col-sm-7">
            <div class="ul-blogs-slider swiper">
              <div class="swiper-wrapper">
                @for (item of posts; track item.slug) {
                  <div class="swiper-slide"><app-post-card [item]="item" /></div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="ul-contact">
      <div class="ul-container">
        <div class="row g-0">
          <div class="col-lg-5"><div class="ul-contact-img"><img src="/assets/img/contact-img.jpg" alt="" /></div></div>
          <div class="col-lg-7">
            <div class="ul-contact-form-wrapper">
              <span class="ul-section-sub-title">Contact us</span>
              <h2 class="ul-section-title">Send a message about a gift or a visit</h2>
              <app-contact-form />
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomePage {
  protected readonly slides = slides;
  protected readonly features = features;
  protected readonly site = site;
  protected readonly campaigns = campaigns;
  protected readonly stats = stats;
  protected readonly services = services;
  protected readonly events = events;
  protected readonly members = members;
  protected readonly testimonials = testimonials;
  protected readonly posts = posts;
}
