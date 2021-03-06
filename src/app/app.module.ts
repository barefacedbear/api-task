import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { LoginComponent } from './pages/login/login.component';
import { ViewComponent } from './pages/view/view.component';
import { AddEditComponent } from './shared/add-edit/add-edit.component';
import { DeleteComponent } from './shared/delete/delete.component';
import { PhonePatternDirective } from './core/directives/phone-pattern.directive';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';

@NgModule({
  declarations: [ AppComponent, HeaderComponent, FooterComponent, LoginComponent, ViewComponent, AddEditComponent, DeleteComponent, PhonePatternDirective ],
  imports: [ BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule,
    FormsModule, ReactiveFormsModule, MaterialModule ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
