import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public postToAdd_Observable = new Subject();
  public postToEdit_Observable = new Subject();
  
  postToEdit: Post;

  constructor() {
    this.postToEdit = new Post('','');
   }

  notifyPostAddition(){
    this.postToAdd_Observable.next();
  }

  notifyPostEdit(){
    this.postToEdit_Observable.next();
  }

  setPostToEdit(post){
    this.postToEdit = new Post(post.title, post.text);
    this.postToEdit.setId(post._id);
    this.notifyPostEdit();
  }

  notifyPostToAdd(){
    this.postToAdd_Observable.next();
  }

  setPostToAdd(){
    this.postToEdit = new Post('','');
    this.postToEdit.setId('');
    this.notifyPostToAdd();
  }
}
