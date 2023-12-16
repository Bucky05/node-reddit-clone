import { Component,OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { LoginRequestPayload } from './login-request-payload';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  loginRequestPayload : LoginRequestPayload = {
    username : '',
    password : ''
  }
  registerSuccessMessage: string;
  isError: boolean;
  constructor(private authService : AuthService, private activatedRouter: ActivatedRoute, private router : Router, private toastr : ToastrService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username : new FormControl('',Validators.required),
      password : new FormControl('',Validators.required)
    })

    this.activatedRouter.queryParams
      .subscribe(params => {
        if(params['registered'] !== undefined && params['registered'] === 'true') {
          this.toastr.success('Signup Successful');
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
          + 'activate your account before you Login!';
        }
      })
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username').value
    this.loginRequestPayload.password = this.loginForm.get('password').value


    try {
    this.authService.login(this.loginRequestPayload).subscribe(data => {
      if(data === true) {
        this.isError = false
        this.router.navigate(['/'])
        this.toastr.success('Login Successful')
      }
      else {
        this.isError = true
        this.toastr.error(data.toString())
      }
    },
    (error : string) => {
      this.toastr.error(error)
    })
  }

catch(err) {
  console.log(err)
}}
}
