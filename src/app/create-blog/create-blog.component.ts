import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Blog } from '../blog';
import { JsonPipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../shared/api.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent {
    blogId!:number
    submitBtn = true
    updateBtn = false
    info:Blog={
      id: 0,
      title:'',
      imageUrl:'',
      content:' ',
     // description:''
    }
    postForm!:FormGroup;

  constructor(private fb: FormBuilder,private api: ApiService,private route: ActivatedRoute){}

  ngOnInit(){
    this.postForm =this.fb.group({
      id:[''],
      title:['',Validators.required],
      content:['',Validators.required ],
      imageUrl:[''],
    //  description:['']
    })

    this.route.params.subscribe(params =>{
      this.blogId = +params['id']
      if(this.blogId){
        console.log("true");
        this.loadBlog()}
    })
  }
  loadBlog(){
    this.api.getBlogById(this.blogId).subscribe(data =>{      
      this.postForm.patchValue({
        id: data.id,
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
       // description: data.description
      })
      this.updateBtn=true
      this.submitBtn=false
    })
  }
  postBlog(){ 
   
    this.updateBtn = false
    this.info.id=Math.round( Math.random()*100)
    this.info.title = this.postForm.value.title
    this.info.content = this.postForm.value.content
    this.info.imageUrl = this.postForm.value.imageUrl
    
    console.log(this.info);
    this.api.postBlog(this.info).subscribe((res)=>{
      // alert("Blog added successfully!")
      this.postForm.reset();  
    })

  }

  updateBlog(){
    this.info.id = this.postForm.value.id
    console.log(this.info.id);
    this.info.title = this.postForm.value.title
    this.info.content = this.postForm.value.content
    this.api.updateBlog(this.info,this.info.id).subscribe((res)=>{
      // alert("Updated successfully");
    })
  }
  resetBlog(){
    this.postForm.reset()
  }
}
