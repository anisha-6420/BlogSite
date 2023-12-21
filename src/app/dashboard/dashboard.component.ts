import { Component } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Blog } from '../blog';

@Component({
selector: 'app-dashboard',
templateUrl: './dashboard.component.html',
styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
blogPost:Blog[]=[]
blogId!:number
searchTerm: string ='';
filteredBlog:Blog[]=[]
pagedBlog:Blog[]=[]
currentPage = 1;
itemsPerPage = 6;
previousLabel = "<"
nextLabel =">"

constructor(private fb: FormBuilder, private api : ApiService, private router : Router){
  
}

ngOnInit():void{
 // this.getAllBlogs();
  this.loadBlogs();
}

setId(id:number){
  this.blogId = id
}
// getAllBlogs(){  
//   this.api.getBlogs().subscribe((res)=>{
//     this.blogPost=res
//      this.filteredBlog=res
//     //console.log(this.blogPost)
//   })    
// }
loadBlogs(): void {
  this.api.getBlogs().subscribe(data => {
    this.blogPost = data;
    this.filterBlogs();
    this.pageChanged({ page: this.currentPage });
  });
}
filterBlogs(): void {
  if (this.searchTerm.trim() === '') {
    this.filteredBlog = this.blogPost;
  } else {
    this.filteredBlog = this.blogPost.filter(blogPost =>
      blogPost.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

pageChanged(event: any): void {
const startIndex = (event.page - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.pagedBlog = this.filteredBlog.slice(startIndex, endIndex);
}

edit(i:any){
  this.router.navigate(['/create-blog',i])
}

searchBlogs(): void {
  this.filterBlogs();
  this.pageChanged({ page: 1 });
}


deleteBlog(i:any){
  this.api.deleteBlog(i).subscribe((res)=>{
     // console.log(i);   
      this.loadBlogs();
  })
}

fullBlog(i : number){
  this.router.navigate(['/full-post',i])
}
}

// onBlogDataChange(event:any){
//   this.page = event
//   this.getAllBlogs()
// }

// onBlogSizeChange(event:any):void{
//   this.blogSize = event.target.value
//   this.page= 1;
//   this.getAllBlogs();
// }

// searchByFilter(val:string){
//   if (!val) {
//      return;
//   }
//   // this.searchFilter =true
//   this.filteredBlog = this.filteredBlog.filter(
//     blog => blog?.title.toLowerCase().includes(val.toLowerCase())
//   );
//   // this.searchFilter=false
// }

