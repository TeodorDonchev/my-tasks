import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ManagerComponent } from './manager/manager.component';
import { BackendCacheService } from './backend-cache.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [BackendCacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
