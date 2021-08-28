import { PostService } from './../../service/post.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  public addPostForm: FormGroup = Object.create(null);

  constructor(
    private router: Router,
    private postSer: PostService,
  ) { }

  ngOnInit(): void {
    this.addForm();
  }


  addForm(){
    this.addPostForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required])
     });
  }

 myJSON:any;
 formdata:any

addPost(){
  this.myJSON = {
    "title":this.addPostForm.value.title,
    "body":this.addPostForm.value.body,
  }


  this.postSer.addPost(this.myJSON)
  .subscribe(res => {
    this.formdata = res
    // console.log(this.formdata);
    this.router.navigate(['/admin/list-posts'])
    Swal.fire({
      text: 'New post Added Successfully',
      timer: 1500,
      showCancelButton: false,
      showConfirmButton: false
    }).then(
      function () { },
      function(dismiss) {
        if (dismiss === 'timer') {
        }
      }
    );
    this.addPostForm.reset();
  })
}

}
