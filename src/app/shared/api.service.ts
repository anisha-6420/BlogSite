import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Blog } from '../blog';
import { Observable } from 'rxjs';
// import * as fs from 'fs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl ='https://picsum.photos';
  constructor(private http : HttpClient) {}

  getBlogById(index:number){
    return this.http.get("http://localhost:3000/blogs/"+index)
    .pipe(map((res:any)=>{
      return res;}
    ))
  }

  postBlog(data : any){
    return this.http.post("http://localhost:3000/blogs",data)
    .pipe(map((res:any)=>{
      return res;}
    ))
  }

  getBlogs(){
    return this.http.get("http://localhost:3000/blogs")
    .pipe(map((res:any)=>{  
      return res;
    }))
  }

  // getLength(){
  //   let rawData = fs.readFileSync('C:\Users\anisha_agarwal\Desktop\Blog\BlogSite\db.json', 'utf8');
  // let jsonData = JSON.parse(rawData);
  //   let i = jsonData.length
  //   return i
  // }

  updateBlog(data:any, index:number){
    return this.http.put<any>('http://localhost:3000/blogs/'+index,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteBlog(index:number){
    return this.http.delete<any>("http://localhost:3000/blogs/"+index)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getRandomImage(width: number, height: number):Observable<Blob>{
    const url = `${this.apiUrl}/${width}/${height}`;
    return this.http.get(url,{responseType:'blob'})
  }
}
