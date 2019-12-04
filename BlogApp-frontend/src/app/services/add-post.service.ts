import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  constructor(private http: HttpClient) { }

  addPost(post: Post) {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.post('/api/post/createPost', {
        title : post.getTitle(),
        text : post.getText(),
        author_id: user.id
    });
  }
}