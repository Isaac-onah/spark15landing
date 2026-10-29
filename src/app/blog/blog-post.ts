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
    <div [class]="nested() ? 'replies' : ''">
      <div class="comment">
        <img [src]="comment().image" alt="" />
        <div>
          <p>{{ comment().text }}</p>
          <strong>{{ comment().name }}</strong>
          <span class="tag">{{ comment().date }}</span>
          <div><button type="button" (click)="replyTo.emit(comment())">Reply</button></div>
        </div>
      </div>
      @for (child of comment().replies ?? []; track child.id) {
        <app-comment [comment]="child" [nested]="true" (replyTo)="replyTo.emit($event)" />
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
    <div class="wrap layout">
      <aside class="side">
        <div class="panel finder">
          <h3>Search</h3>
          <form (ngSubmit)="onSearch()">
            <input type="search" [value]="query()" (input)="query.set(inputValue($event))" placeholder="Search stories" />
            <button class="btn teal" type="submit">Go</button>
          </form>
          @if (results(); as results) {
            <div style="margin-top: 12px">
              @if (results.length === 0) {
                <p>No stories matched that search.</p>
              } @else {
                @for (item of results; track item.slug) {
                  <a class="side-link" [routerLink]="['/blog', item.slug]">
                    <img [src]="item.image" alt="" />
                    <span>{{ item.date }}<br />{{ item.title }}</span>
                  </a>
                }
              }
            </div>
          }
        </div>
        <div class="panel">
          <h3>Categories</h3>
          <div class="side-nav">
            @for (item of categories; track item.name) {
              <a [routerLink]="item.to">{{ item.name }} ({{ pad(item.count) }})</a>
            }
          </div>
        </div>
        <div class="panel">
          <h3>Other stories</h3>
          @for (item of recent(); track item.slug) {
            <a class="side-link" [routerLink]="['/blog', item.slug]">
              <img [src]="item.image" alt="" />
              <span>{{ item.date }}<br />{{ item.title }}</span>
            </a>
          }
        </div>
        <div class="chips">
          @for (item of tags; track item.name) {
            <a [routerLink]="item.to">{{ item.name }}</a>
          }
        </div>
      </aside>
      <article class="article">
        <img class="cover" [src]="post().image" alt="" />
        <div class="info-row">
          <span>{{ post().author }}</span>
          <span>{{ post().category }}</span>
          <span>{{ post().date }}</span>
        </div>
        <h2>{{ post().title }}</h2>
        <div class="prose">
          @for (paragraph of beforeQuote(); track paragraph) {
            <p>{{ paragraph }}</p>
          }
          <blockquote>{{ post().quote }}</blockquote>
          @if (afterQuote()[0]) {
            <p>{{ afterQuote()[0] }}</p>
          }
          <div class="gallery">
            @for (src of post().gallery; track src) {
              <img [src]="src" alt="" />
            }
          </div>
          @for (paragraph of afterQuote().slice(1); track paragraph) {
            <p>{{ paragraph }}</p>
          }
        </div>
        <div class="chips" style="margin: 18px 0">
          @for (tag of post().tags; track tag) {
            <a [routerLink]="tagLink(tag)">{{ tag }}</a>
          }
          <a [href]="facebookUrl()" target="_blank" rel="noreferrer">Facebook</a>
          <a [href]="twitterUrl()" target="_blank" rel="noreferrer">X</a>
          <a [href]="linkedinUrl()" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <h3>{{ pad(count()) }} comments</h3>
        @for (comment of comments(); track comment.id) {
          <app-comment [comment]="comment" (replyTo)="replyTo.set($event)" />
        }
        <h3 style="margin-top: 22px">Leave a comment</h3>
        <p class="lede">Your email is only used to check the form.</p>
        @if (replyTo(); as parent) {
          <p class="form-note">Replying to {{ parent.name }}. <button type="button" class="text-button" (click)="replyTo.set(null)">Cancel</button></p>
        }
        <form class="form" style="margin-top: 12px" #form (ngSubmit)="onComment(form)">
          <label class="field"><input type="text" name="name" placeholder="Your name" /></label>
          <label class="field"><input type="email" name="email" placeholder="Email address" /></label>
          <label class="field wide"><textarea name="message" placeholder="Your comment"></textarea></label>
          <div class="wide">
            <button class="btn" type="submit">Post comment</button>
            @if (note()) {
              <p class="form-note" [class.ok]="ok()" [class.error]="!ok()">{{ note() }}</p>
            }
          </div>
        </form>
      </article>
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
    this.note.set('Comment added on this page only.');
    form.reset();
  }
}
