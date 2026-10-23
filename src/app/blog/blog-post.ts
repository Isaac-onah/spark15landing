import { Component, computed, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Post, PostComment, posts, site } from '../../data/content';

function countComments(list: PostComment[]): number {
  return list.reduce((total, comment) => total + 1 + countComments(comment.replies ?? []), 0);
}

function addReply(list: PostComment[], parentId: string, reply: PostComment): PostComment[] {
  return list.map((comment) => {
    if (comment.id === parentId) {
      return { ...comment, replies: [...(comment.replies ?? []), reply] };
    }
    if (!comment.replies?.length) return comment;
    return { ...comment, replies: addReply(comment.replies, parentId, reply) };
  });
}

@Component({
  selector: 'app-comment',
  imports: [Comment],
  template: `
    <div [class]="nested() ? 'ul-blog-details-review-reply' : 'ul-blog-details-review'">
      <div class="main-comment">
        <div class="ul-blog-details-review-reviewer-img">
          <img [src]="comment().image" alt="" />
        </div>
        <div class="ul-blog-details-review-txt">
          <p>{{ comment().text }}</p>
          <div class="reviewer">
            <h4 class="reviewer-name">{{ comment().name }}</h4>
            <h5 class="review-date">{{ comment().date }}</h5>
          </div>
          <button type="button" class="ul-blog-details-review-reply-btn" (click)="replyTo.emit(comment())">
            <i class="flaticon-reply"></i> Reply
          </button>
        </div>
      </div>
      @if (comment().replies?.length) {
        <div class="ul-blog-details-review-replies">
          @for (child of comment().replies ?? []; track child.id) {
            <app-comment [comment]="child" [nested]="true" (replyTo)="replyTo.emit($event)" />
          }
        </div>
      }
    </div>
  `,
})
export class Comment {
  readonly comment = input.required<PostComment>();
  readonly nested = input(false);
  readonly replyTo = output<PostComment>();
}

@Component({
  selector: 'app-blog-post',
  imports: [RouterLink, FormsModule, Comment],
  template: `
    <div class="ul-section-spacing">
      <div class="ul-container">
        <div class="row ul-bs-row gy-5 flex-column-reverse flex-md-row">
          <div class="col-lg-4 col-md-5">
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
                      placeholder="Search Here"
                    />
                    <button type="submit"><span class="icon"><i class="flaticon-search"></i></span></button>
                  </form>
                  @if (results(); as results) {
                    <div class="ul-inner-sidebar-posts sidebar-results">
                      @if (results.length === 0) {
                        <p>No stories matched that search.</p>
                      } @else {
                        @for (item of results; track item.slug) {
                          <div class="ul-inner-sidebar-post">
                            <div class="img"><img [src]="item.image" alt="" /></div>
                            <div class="txt">
                              <h4 class="title"><a [routerLink]="['/blog', item.slug]">{{ item.title }}</a></h4>
                              <span class="date"><span>{{ item.date }}</span></span>
                            </div>
                          </div>
                        }
                      }
                    </div>
                  }
                </div>
              </div>

              <div class="ul-inner-sidebar-widget categories">
                <h3 class="ul-inner-sidebar-widget-title">Categories</h3>
                <div class="ul-inner-sidebar-widget-content">
                  <div class="ul-inner-sidebar-categories">
                    @for (item of categories; track item.name) {
                      <a [routerLink]="item.to">{{ item.name }} <span>({{ pad(item.count) }})</span></a>
                    }
                  </div>
                </div>
              </div>

              <div class="ul-inner-sidebar-widget posts">
                <h3 class="ul-inner-sidebar-widget-title">Recent Posts</h3>
                <div class="ul-inner-sidebar-widget-content">
                  <div class="ul-inner-sidebar-posts">
                    @for (item of recent(); track item.slug) {
                      <div class="ul-inner-sidebar-post">
                        <div class="img"><img [src]="item.image" alt="" /></div>
                        <div class="txt">
                          <h4 class="title"><a [routerLink]="['/blog', item.slug]">{{ item.title }}</a></h4>
                          <span class="date"><span>{{ item.date }}</span></span>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>

              <div class="ul-inner-sidebar-widget tags">
                <h3 class="ul-inner-sidebar-widget-title">Tag Cloud</h3>
                <div class="ul-inner-sidebar-widget-content">
                  <div class="ul-inner-sidebar-tags">
                    @for (item of tags; track item.name) {
                      <a [routerLink]="item.to">{{ item.name }}</a>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-8 col-md-7">
            <div class="ul-blog-details ul-blog-inner mb-0">
              <div class="ul-blog-2 ul-blog-inner">
                <div class="ul-blog-img"><img [src]="post().image" alt="" /></div>
                <div class="ul-blog-txt">
                  <div class="ul-blog-infos">
                    <div class="ul-blog-info">
                      <span class="icon"><i class="flaticon-account"></i></span>
                      <span class="text">By {{ post().author }}</span>
                    </div>
                    <div class="ul-blog-info">
                      <span class="icon"><i class="flaticon-price-tag"></i></span>
                      <span class="text">{{ post().category }}</span>
                    </div>
                    <div class="ul-blog-info">
                      <span class="icon"><i class="flaticon-calendar"></i></span>
                      <span class="text">{{ post().date }}</span>
                    </div>
                  </div>
                  <h2 class="ul-blog-title">{{ post().title }}</h2>
                  <div class="ul-donation-details-summary-txt ul-blog-details-txt">
                    @for (paragraph of beforeQuote(); track paragraph) {
                      <p>{{ paragraph }}</p>
                    }
                    <blockquote>{{ post().quote }}</blockquote>
                    @if (afterQuote()[0]) {
                      <p>{{ afterQuote()[0] }}</p>
                    }
                    <div class="ul-donation-details-summary-imgs">
                      @for (src of post().gallery; track src) {
                        <img [src]="src" alt="" />
                      }
                    </div>
                    @for (paragraph of afterQuote().slice(1); track paragraph) {
                      <p>{{ paragraph }}</p>
                    }
                  </div>
                </div>
              </div>

              <div class="ul-blog-details-actions">
                <div class="tags-wrapper">
                  <h4 class="actions-title">Tags: </h4>
                  <div class="ul-blog-sidebar-tags tags">
                    @for (tag of post().tags; track tag) {
                      <a [routerLink]="tagLink(tag)">{{ tag }}</a>
                    }
                  </div>
                </div>
                <div class="shares-wrapper">
                  <h4 class="actions-title">Share: </h4>
                  <div class="share-options">
                    <a [href]="facebookUrl()" target="_blank" rel="noreferrer"><i class="flaticon-facebook"></i></a>
                    <a [href]="twitterUrl()" target="_blank" rel="noreferrer"><i class="flaticon-twitter"></i></a>
                    <a [href]="linkedinUrl()" target="_blank" rel="noreferrer"><i class="flaticon-linkedin-big-logo"></i></a>
                    @for (item of instagram; track item.icon) {
                      <a [href]="item.href"><i [class]="item.icon"></i></a>
                    }
                  </div>
                </div>
              </div>

              <div class="ul-blog-details-bottom">
                <div class="ul-blog-details-reviews">
                  <h3 class="ul-blog-details-inner-title ul-donation-details-summary-title">
                    {{ pad(count()) }} Comments
                  </h3>
                  @for (comment of comments(); track comment.id) {
                    <app-comment [comment]="comment" (replyTo)="replyTo.set($event)" />
                  }
                </div>

                <div class="ul-blog-details-review-form-wrapper">
                  <h3 class="ul-blog-details-inner-title ul-donation-details-summary-title">Leave a Comment</h3>
                  <p>Your email address is only used to check the form. It is not shown on the page.</p>
                  @if (replyTo(); as parent) {
                    <p class="form-note">
                      Replying to {{ parent.name }}.
                      <button type="button" class="text-button" (click)="replyTo.set(null)">Cancel</button>
                    </p>
                  }
                  <form class="ul-contact-form ul-form" #form (ngSubmit)="onComment(form)">
                    <div class="row row-cols-2 row-cols-xxs-1 ul-bs-row">
                      <div class="col"><div class="form-group"><input type="text" name="name" placeholder="Your Name" /></div></div>
                      <div class="col"><div class="form-group"><input type="email" name="email" placeholder="Email Address" /></div></div>
                      <div class="col-12"><div class="form-group"><textarea name="message" placeholder="Type your message"></textarea></div></div>
                      <div class="col-12">
                        <button class="ul-btn" type="submit">
                          <i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Get in Touch
                        </button>
                        @if (note()) {
                          <p class="form-note" [class.ok]="ok()" [class.error]="!ok()">{{ note() }}</p>
                        }
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class BlogPost {
  readonly post = input.required<Post>();
  protected readonly comments = signal<PostComment[]>([]);
  protected readonly replyTo = signal<PostComment | null>(null);
  protected readonly note = signal('');
  protected readonly ok = signal(false);
  protected readonly query = signal('');
  protected readonly results = signal<Post[] | null>(null);
  protected readonly instagram = site.socials.filter((item) => item.icon.includes('instagram'));
  protected readonly categories = [...new Set(posts.map((item) => item.category))].map((name) => ({
    name,
    count: posts.filter((item) => item.category === name).length,
    to: `/blog/${posts.find((item) => item.category === name)?.slug ?? ''}`,
  }));
  protected readonly tags = [...new Set(posts.flatMap((item) => item.tags))].map((name) => ({
    name,
    to: `/blog/${posts.find((item) => item.tags.includes(name))?.slug ?? ''}`,
  }));
  protected readonly recent = computed(() => posts.filter((item) => item.slug !== this.post().slug));
  protected readonly beforeQuote = computed(() => this.post().body.slice(0, 2));
  protected readonly afterQuote = computed(() => this.post().body.slice(2));
  protected readonly count = computed(() => countComments(this.comments()));

  constructor() {
    effect(() => {
      const post = this.post();
      this.comments.set(post.comments.map((comment) => ({ ...comment })));
      this.replyTo.set(null);
      this.note.set('');
      this.query.set('');
      this.results.set(null);
    });
  }

  protected pad(value: number) {
    return String(value).padStart(2, '0');
  }

  protected tagLink(tag: string) {
    return `/blog/${posts.find((item) => item.tags.includes(tag))?.slug ?? ''}`;
  }

  protected inputValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }

  protected onSearch() {
    const term = this.query().trim().toLowerCase();
    if (!term) {
      this.results.set([]);
      return;
    }
    this.results.set(
      posts.filter((item) =>
        `${item.title} ${item.excerpt} ${item.category} ${item.tags.join(' ')}`.toLowerCase().includes(term),
      ),
    );
  }

  protected facebookUrl() {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
  }

  protected twitterUrl() {
    return `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(this.post().title)}`;
  }

  protected linkedinUrl() {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
  }

  protected onComment(form: HTMLFormElement) {
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const text = String(data.get('message') || '').trim();
    if (!name || !email.includes('@') || text.length < 8) {
      this.ok.set(false);
      this.note.set('Add your name, a valid email, and a comment of at least 8 characters.');
      return;
    }
    const next: PostComment = {
      id: `local-${Date.now()}`,
      name,
      date: new Date().toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }),
      text,
      image: '/assets/img/commenter-1.jpg',
    };
    const parent = this.replyTo();
    this.comments.update((current) => (parent ? addReply(current, parent.id, next) : [next, ...current]));
    this.replyTo.set(null);
    this.ok.set(true);
    this.note.set('Comment added on this page. It will be saved when the site is connected to Supabase.');
    form.reset();
  }
}
