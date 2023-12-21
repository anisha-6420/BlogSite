import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FullPostComponent } from './full-post/full-post.component';

const routes: Routes = [
 { path:"",component: DashboardComponent},
 {path:"create-blog",component: CreateBlogComponent},
 {path:"create-blog/:id",component: CreateBlogComponent},
 {path:"full-post/:id", component:FullPostComponent},
 {path:'**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
