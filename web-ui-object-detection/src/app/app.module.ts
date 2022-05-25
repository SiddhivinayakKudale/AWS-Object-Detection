import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { DeleteImageComponent } from './delete-image/delete-image.component';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SearchByTagsComponent } from './search-by-tags/search-by-tags.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadImageComponent,
    DeleteImageComponent,
    SignUpComponent,
    SearchByTagsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
