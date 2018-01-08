import { AuthService } from './shared/services/auth.service';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routeConfig: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [ AuthService ],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent,
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routeConfig)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {}
