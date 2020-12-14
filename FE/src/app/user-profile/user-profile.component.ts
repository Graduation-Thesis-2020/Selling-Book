import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginReturn, User } from '../models/user';
import { UserService } from '../service/user.service';
import { Profile } from './../models/user';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  sex: string;
  public showMessage;
  user: User;
  userRes: LoginReturn;
  FileUpload : File = null;
  imageURL = '/assets/image/00128.jpg';
  selectFile = null;
  profile : Profile;
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  constructor(private UserService: UserService,private router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadUser();
    this.loadProfile();
  }
  onItemChange(value) {
    this.sex = value;
  }
  save(name: string, phone: string, birthday: Date, address: string,image: File) {
    const token = (localStorage.getItem("token"));
    //console.log(token);
    const gender = this.profile.gender;
    const email = this.profile.email;
    const newUser: User = { email, phone, name,gender,birthday,address,image} as User;
    console.log(newUser);
    this.UserService.EditProfile(email, phone, name,gender,birthday,address,image, token)
          .subscribe(res=> {
            this.profile = res; console.log(this.profile);
            localStorage.setItem("currentUser", JSON.stringify(this.profile));
            this._snackBar.open("Lưu thành công","Đóng", {
              panelClass: "snackbarConfig1",
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            setTimeout(function(){ window.location.reload(); }, 0);
          },

            error => {this.showMessage = error;
                      this._snackBar.open("Lưu thất bại","Đóng", {
                        panelClass: "snackbarErrorConfig",
                        duration: 3000,
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                      })});

  }

  loadUser() {
    this.userRes = JSON.parse(localStorage.getItem("currentUser"));
  }
  handleFileInput(file: FileList) {
    this.FileUpload = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageURL = event.target.result;
    }
    reader.readAsDataURL(this.FileUpload);
    console.log(this.FileUpload);
  }
  loadProfile(){
    const token = localStorage.getItem("token");
    this.UserService.getProfile(token).subscribe(user => {this.profile = user, console.log(this.profile)});
  }
}
