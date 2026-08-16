import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    data: { showHero: true }
  },
  { 
    path: 'home', 
    redirectTo: '',
    pathMatch: 'full'
  },
  // {
  //   path: 'about',
  //   component: AboutComponent,
  //   data: { showHero: false }
  // },
  // {
  //   path: 'projects',
  //   component: ProjectsComponent,
  //   data: { showHero: false }
  // },
  // {
  //   path: 'contact',
  //   component: ContactComponent,
  //   data: { showHero: false }
  // },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
