import { AuthGuard } from './_guards/auth.guard';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import {Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';

export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '', // localhost:4200/
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'lists', component: ListsComponent}
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
