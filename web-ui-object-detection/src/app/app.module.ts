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
import { UpdatedeletetagsByurlComponent } from './updatedeletetags-byurl/updatedeletetags-byurl.component';
import { SearchImageObTagsComponent } from './search-image-ob-tags/search-image-ob-tags.component';
import { SearchByTagsMultipleComponent } from './search-by-tags-multiple/search-by-tags-multiple.component';
import { SignoutComponent } from './signout/signout.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadImageComponent,
    DeleteImageComponent,
    SignUpComponent,
    SearchByTagsComponent,
    UpdatedeletetagsByurlComponent,
    SearchImageObTagsComponent,
    SearchByTagsMultipleComponent,
    SignoutComponent
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
