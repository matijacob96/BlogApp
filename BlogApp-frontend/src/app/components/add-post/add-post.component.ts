import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AddPostService } from "../../services/add-post.service";
import { Post } from "../../models/post.model";
import { CommonService } from "../../services/common.service";

@Component({
  selector: "app-add-post",
  templateUrl: "./add-post.component.html",
  styleUrls: ["./add-post.component.css"]
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  submitted = false;
  post: Post;
  @ViewChild("closeBtn", { static: false }) closeBtn: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private addPostService: AddPostService,
    private commonService: CommonService
  ) {
    this.commonService.postToEdit_Observable.subscribe(res => {
      this.setPostToEdit();
    });
    this.commonService.postToAdd_Observable.subscribe(res => {
      this.setPostToEdit();
    });
  }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: ["", Validators.required],
      text: ["", Validators.required]
    });
  }

  get f() {
    return this.postForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.postForm.invalid) {
      return;
    }

    this.post.setText(this.f.title.value);
    this.post.setText(this.f.text.value);

    this.addPostService.addPost(this.post).subscribe(result => {
      if (result["status"] === "success") {
        this.closeBtn.nativeElement.click();
        this.commonService.notifyPostAddition();
      } else {
        console.log("Error adding post");
      }
    });
  }

  setPostToEdit() {
    this.post = this.commonService.postToEdit;
    this.postForm = this.formBuilder.group({
      title: [this.post.getTitle(), Validators.required],
      text: [this.post.getText(), Validators.required]
    });
  }
}
