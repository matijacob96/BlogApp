import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { CommonService } from '../../services/common.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})

export class PostComponent implements OnInit {

  @Input() post: any = {};
  @Input() read = true;
  @Input() admin = false;

  constructor(private commonService: CommonService) {}

  ngOnInit() {}

  setPostToEdit(post){
    this.commonService.setPostToEdit(post);
  }

}
