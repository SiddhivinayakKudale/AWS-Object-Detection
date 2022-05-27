import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteImageComponent } from './delete-image/delete-image.component';
import { HomeComponent } from './home/home.component';
import { SearchByTagsMultipleComponent } from './search-by-tags-multiple/search-by-tags-multiple.component';
import { SearchByTagsComponent } from './search-by-tags/search-by-tags.component';
import { SearchImageObTagsComponent } from './search-image-ob-tags/search-image-ob-tags.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignoutComponent } from './signout/signout.component';
import { UpdatedeletetagsByurlComponent } from './updatedeletetags-byurl/updatedeletetags-byurl.component';
import { UploadImageComponent } from './upload-image/upload-image.component';

const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: 'home-component', component: HomeComponent },
  { path: 'upload-image', component: UploadImageComponent },
  { path: 'delete-image', component: DeleteImageComponent },
  { path: 'app-search-by-tags', component: SearchByTagsComponent },
  { path: 'update-delete-tag', component: UpdatedeletetagsByurlComponent },
  { path: 'search-image-tag', component: SearchImageObTagsComponent },
  { path: 'search-image-tag-multiple', component: SearchByTagsMultipleComponent },
  { path: 'signout', component: SignoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
