import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { HomePage } from './pages/home';
import {
  AboutPage,
  BlogDetailPage,
  BlogPage,
  ContactPage,
  DonationDetailPage,
  DonationsPage,
  EventDetailPage,
  EventsPage,
  FaqPage,
  NotFoundPage,
  ProjectDetailPage,
  ProjectsPage,
  ServiceDetailPage,
  ServicesPage,
  TeamDetailPage,
  TeamPage,
} from './pages/pages';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: HomePage },
      { path: 'about', component: AboutPage },
      { path: 'services', component: ServicesPage },
      { path: 'services/:slug', component: ServiceDetailPage },
      { path: 'projects', component: ProjectsPage },
      { path: 'projects/:slug', component: ProjectDetailPage },
      { path: 'donations', component: DonationsPage },
      { path: 'donations/:slug', component: DonationDetailPage },
      { path: 'events', component: EventsPage },
      { path: 'events/:slug', component: EventDetailPage },
      { path: 'team', component: TeamPage },
      { path: 'team/:slug', component: TeamDetailPage },
      { path: 'blog', component: BlogPage },
      { path: 'blog/:slug', component: BlogDetailPage },
      { path: 'faq', component: FaqPage },
      { path: 'contact', component: ContactPage },
      { path: 'home', redirectTo: '', pathMatch: 'full' },
      { path: '**', component: NotFoundPage },
    ],
  },
];
