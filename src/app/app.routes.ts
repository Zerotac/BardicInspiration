import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'name',
    loadComponent: () => import('./pages/name/name.page').then( m => m.NamePage)
  },
  {
    path: 'pronoun',
    loadComponent: () => import('./pages/pronoun/pronoun.page').then( m => m.PronounPage)
  },
  {
    path: 'birth',
    loadComponent: () => import('./pages/birth/birth.page').then( m => m.BirthPage)
  },
  {
    path: 'class',
    loadComponent: () => import('./pages/class/class.page').then( m => m.ClassPage)
  },
  {
    path: 'subclass',
    loadComponent: () => import('./pages/subclass/subclass.page').then( m => m.SubclassPage)
  },
  {
    path: 'tropes',
    loadComponent: () => import('./pages/tropes/tropes.page').then( m => m.TropesPage)
  },
  {
    path: 'story',
    loadComponent: () => import('./pages/story/story.page').then( m => m.StoryPage)
  },
  {
    path: 'pdf',
    loadComponent: () => import('./pages/pdf/pdf.page').then( m => m.PdfPage)
  },
];
