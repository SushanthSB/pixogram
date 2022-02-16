import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SigninComponent} from './accountdetails/signin/signin.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule } from "@angular/material/sidenav";
import {MatListModule } from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule } from "@angular/material/icon";
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';

import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './accountdetails/register/register.component';
import { MymediaComponent } from './mymedia/mymedia.component';
import { SinglemediauploadComponent } from './uploadmedia/singlemediaupload/singlemediaupload.component';
import { MultiplemediauploadComponent } from './uploadmedia/multiplemediaupload/multiplemediaupload.component';
import { MediadetailComponent } from './mediadetail/mediadetail.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { FollowingComponent } from './Followers/following/following.component';
@NgModule({
  declarations: [
    
    AppComponent,
    SigninComponent,
    NavigationComponent,
    RegisterComponent,
    MymediaComponent,
    SinglemediauploadComponent,
    MultiplemediauploadComponent,
    MediadetailComponent,
    FollowingComponent

  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule, 
    MatSnackBarModule, 
    MatCardModule, 

    FlexLayoutModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
