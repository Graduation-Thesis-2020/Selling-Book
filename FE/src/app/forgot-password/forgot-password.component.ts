import { Component, OnInit } from '@angular/core';
import { SendCode } from '../models/user';
import { UserService } from './../service/user.service';
import { error } from 'protractor';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormChangePassword } from './../models/user';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  message: any;
  messageError: any;
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  forgotPasswordForm: FormGroup;
  forgotPassword = { email: "",code:"", password: "", confirmPassword: "" };
  change: any;
  changeError: any;
  constructor(private userService: UserService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(this.forgotPassword.email, [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
      ]),
      code: new FormControl(this.forgotPassword.code, [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern("[0-9]*"),
      ]),

      password: new FormControl(this.forgotPassword.password, [Validators.required]),
      confirmpassword: new FormControl(this.forgotPassword.confirmPassword, [
        Validators.required,
      ]),

    });
  }
  get email() {
    return this.forgotPasswordForm.get("email");
  }
  get code() {
    return this.forgotPasswordForm.get("code");
  }
  get password() {
    return this.forgotPasswordForm.get("password");
  }
  get confirmPassword() {
    return this.forgotPasswordForm.get("confirmPassword");
  }

  sendCode(email){
    if(email == ''){
      console.log('null')
    }
    else {
      const code: SendCode = {email} as SendCode;
      console.log(code);
      this.userService.SendCode(code).subscribe( res => {
        this.message = res;
        console.log(this.message);
        this._snackBar.open(this.message.message,"Đóng", {
          panelClass: "snackbarConfig1",
          duration: 5000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
      },
      error => {
        this.messageError = error;
        console.log(this.messageError.error.message);
        this._snackBar.open(this.messageError.error.message,"Đóng", {
          panelClass: "snackbarErrorConfig",
          duration: 5000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
      });
    }

  }
  ChangePassword(){
    //console.log(this.forgotPassword);
    const codeResetPassword = this.forgotPassword.code;
    const password= this.forgotPassword.password;
    const confirmPassword = this.forgotPassword.confirmPassword;
    const formChange : FormChangePassword = { codeResetPassword, password, confirmPassword} as FormChangePassword;
    //console.log(formChange);
    this.userService.ChangePassword(formChange).subscribe(
      res=> {this.change = res;
            this._snackBar.open(this.change.message,"Đóng", {
              panelClass: "snackbarConfig1",
              duration: 5000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            })
      }, error => {
        this.changeError = error;
        this._snackBar.open(this.changeError.error.message,"Đóng", {
          panelClass: "snackbarErrorConfig",
          duration: 5000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
      }
    );
  }
}
