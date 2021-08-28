import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from './../../service/post.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  constructor(
   private postSer: PostService,
   private router: Router,
   private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
   this.getAllPostList();
  }


 // =============get all post list============
 postArray:any;
 postArrayength: any;

 getAllPostList(){
   this.postSer.getAllPostList().subscribe(data => {
     this.postArray = data;
     console.log(this.postArray)
     this.postArrayength = this.postArray.length;
   })
 }


  // dellete a post
  deletePost(id:any) {
    Swal.fire({
      text: 'Are you sure you want to remove this Post?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {

      if (result.isConfirmed) {
        this.postSer.deletePost(id).subscribe(res => {
           this.getAllPostList();
          });
          Swal.fire({
            text: 'Oops You lost this Post',
            timer: 1000,
            showCancelButton: false,
            showConfirmButton: false
          }).then(
            function () { },
            function(dismiss) {
              if (dismiss === 'timer') {
              }
            }
          );
      }
      else if (result.isDismissed) {
        console.log('Clicked No, File is safe!');
      }
    });
  }

public editPostForm: FormGroup = Object.create(null);
selectedPost:any;
closeResult = '';

// edit open
open(content:any, product:any) {
  this.editPostForm = new FormGroup({
   title: new FormControl('', [Validators.required]),
   body: new FormControl('', [Validators.required]),
   userId: new FormControl('', [Validators.required])
 });
     // console.log(id);
    this.selectedPost = product;
    console.log(this.selectedPost);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
}

myJSON:any;

updatePost(id:any):void{

 this.myJSON = {
   "title":this.editPostForm.value.title,
   "body":this.editPostForm.value.body,
   "userId":this.editPostForm.value.userId,
 }

 this.postSer.updatePost(this.selectedPost.id, this.myJSON)
  .subscribe(
    response => {
      this.getAllPostList();
      this.router.navigate(['/admin/list-posts'])
      Swal.fire({
        // title: 'Auto close alert!',
        text: 'post Details Updated Successfully',
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false
      }).then(
        function () { },
        function(dismiss) {
          if (dismiss === 'timer') {
          }
        }
      );
    },
    error => {
      console.log(error);
    }
  )
}

}
