import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { Post } from 'src/app/models/post.model';
import { AddPostService } from '../../services/add-post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: any[];
  @ViewChild('addPost', {static: false}) addBtn: ElementRef;
  @ViewChild('editPost', {static: false}) editBtn: ElementRef;
  @ViewChild('deletePost', {static: false}) deleteBtn: ElementRef;
  @ViewChild('cancelBtn', {static: false}) cancelBtn: ElementRef;

  postToDelete: Post;

  constructor( private postService: PostService,
               private auth: AuthService,
               private router: Router,
               private commonService: CommonService,
               private addPostService: AddPostService) {
      this.commonService.postToEdit_Observable.subscribe(res => {
        this.editBtn.nativeElement.click();
      });
      this.commonService.postToDelete_Observable.subscribe(res => {
        this.postToDelete = this.commonService.postToDelete;
        this.deleteBtn.nativeElement.click();
      })
     }

  ngOnInit() {
    
    this.getPosts();

    this.commonService.postToAdd_Observable.subscribe((res) => {
      this.getPosts();
    })
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['']);
  }

  getPosts() {
    this.postService.getPostsByAuthor().subscribe((result) => {
      this.posts = result['data'];
      console.log( this.posts);
    })
  }

  resetPost(){
    this.commonService.setPostToAdd();
  }

  delete(){
    this.addPostService.deletePost(this.postToDelete).subscribe((result) =>{
      this.getPosts();
      this.cancelBtn.nativeElement.click();
    })
  }

}
