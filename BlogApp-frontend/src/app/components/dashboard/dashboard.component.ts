import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: any[];

  constructor( private postService: PostService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    
    this.getPosts();
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

}
