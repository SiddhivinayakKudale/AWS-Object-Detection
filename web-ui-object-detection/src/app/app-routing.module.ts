import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteImageComponent } from './delete-image/delete-image.component';
import { HomeComponent } from './home/home.component';
import { SearchByTagsComponent } from './search-by-tags/search-by-tags.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UploadImageComponent } from './upload-image/upload-image.component';

const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: 'home-component', component: HomeComponent },
  { path: 'upload-image', component: UploadImageComponent },
  { path: 'delete-image', component: DeleteImageComponent },
  { path: 'app-search-by-tags', component: SearchByTagsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
