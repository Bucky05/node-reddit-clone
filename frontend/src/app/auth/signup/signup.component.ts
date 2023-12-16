import { Component , OnInit} from '@angular/core';
import {FormGroup , FormControl,Validators} from '@angular/forms'
import { SignupRequestPayloadComponent } from './singup-request-payload';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  signupRequestPayload : SignupRequestPayloadComponent
  constructor(private authService : AuthService, private router : Router, private toastr : ToastrService) {
    this.signupRequestPayload = {
      email: '',
      username: '',
      password: ''
    }
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup( {
      username : new FormControl('',Validators.required),
      password : new FormControl('',Validators.required),
      email : new FormControl('',[Validators.required , Validators.email])
  })
  }

  signup() {
    this.signupRequestPayload.email =  this.signUpForm.get('email').value
    this.signupRequestPayload.password = this.signUpForm.get('password').value
    this.signupRequestPayload.username = this.signUpForm.get('username').value
    this.authService.signup(this.signupRequestPayload)
      .subscribe(() => {
        this.router.navigate(['/login'], { queryParams : { registered: 'true'}});
      },
      () => {
       this.toastr.error('Registration Faild! Please try again')
      })
  }
}
