import { PostService } from './../service/post.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public loginForm: FormGroup = Object.create(null);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postSer:PostService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username:['admin123@gmail.com',Validators.required],
      password:['admin123',Validators.required]
    })
}

  get f(){
    return this.loginForm.controls;
  }

    //Login Form Submit
    tryLogin(){
      if(this.loginForm.invalid){
        return
      }
      const val = {
        username : this.f.username.value,
        password : this.f.password.value
      }
      var loggedIn = this.postSer.doLogin(val)
      if(loggedIn == true){

        setTimeout(() => {
        }, 1000);
           this.setUserInStorage(loggedIn)
           this.router.navigate(['/admin/list-posts'])
          }
      else{
        alert("username or password is incorrect..")
      }
    }

  //Set login data into localStorage
  setUserInStorage(data: any){
    localStorage.setItem("user_data",data);
  }

}
