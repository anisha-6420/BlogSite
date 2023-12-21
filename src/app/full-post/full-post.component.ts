import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../blog';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.css']
})
export class FullPostComponent {

  blogId!:number 
  blogPost!:Blog

  constructor(private fb: FormBuilder, private api:ApiService,private route: ActivatedRoute){}

  ngOnInit(){
    this.route.params.subscribe(params =>{
      this.blogId = +params['id']
      if(this.blogId){
        console.log("true");
        this.loadBlog()}
    })
    
  }
  
  loadBlog() {
    this.api.getBlogById(this.blogId).subscribe(data=>{
      this.blogPost = data;
      if(this.blogPost.imageUrl == ''){
       this.api.getRandomImage(400,300).subscribe((img: Blob)=>{
        const reader = new FileReader();
        reader.onloadend = () => {
          this.blogPost.imageUrl = reader.result as string;
        };
        reader.readAsDataURL(img);        
       }) 
      }  
    })
  }

}
