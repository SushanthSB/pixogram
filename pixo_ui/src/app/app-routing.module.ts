import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './accountdetails/signin/signin.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterComponent } from './accountdetails/register/register.component';
import { SinglemediauploadComponent } from './uploadmedia/singlemediaupload/singlemediaupload.component';
import { MultiplemediauploadComponent } from './uploadmedia/multiplemediaupload/multiplemediaupload.component';
import { MymediaComponent } from './mymedia/mymedia.component';
import { MediadetailComponent } from './mediadetail/mediadetail.component';

import { AuthGuardService } from './services/auth-guard.service';
import { FollowingComponent } from './Followers/following/following.component';
const routes: Routes = [
  
  { path: '', redirectTo: "dashboard/signin", pathMatch: "full" },
  {
    path: "dashboard", component: NavigationComponent,
    children: [
      { path: 'signin', component: SigninComponent,data: { title: 'Login' }},
      { path: 'register', component: RegisterComponent, data: { title: 'Register' }},
      { path: 'singlemedia', component: SinglemediauploadComponent, canActivate: [AuthGuardService],data: { title: 'upload' }},
      { path: 'multiplemedia', component: MultiplemediauploadComponent, canActivate: [AuthGuardService],data: { title: 'upload' }},
      { path: 'mymedia', component: MymediaComponent, canActivate: [AuthGuardService],data: { title: 'mymedia' }},
      { path: 'mediadetail', component: MediadetailComponent, canActivate: [AuthGuardService],data: { title: 'mymedia' }},
      { path: 'followers', component: FollowingComponent, canActivate: [AuthGuardService],data: { title: 'mymedia' }},
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

 
}
