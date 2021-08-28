import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  doLogin(value: any){
    if(value.username == 'admin123@gmail.com' && value.password == 'admin123'){
      return true
    }else{
      return false
    }
  }

  // get all post list
  getAllPostList():Observable<any>{
    return this.http.get(baseUrl + '/posts');
  }

  // add a new post
  addPost(data:any): Observable<any> {
    return this.http.post(baseUrl + '/posts',data);
  }

  // single post delete
  deletePost(id:string): Observable<any>{
    return this.http.delete<any>(`${baseUrl}/posts/${id}`);
  }

  // update single post
  updatePost(id:any, data:any): Observable<any>{
    return this.http.put(`${baseUrl}/posts/${id}`, data);
  }


}
