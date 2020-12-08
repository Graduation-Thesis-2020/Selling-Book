import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginReturn, User } from '../models/user';
import { UserService } from '../service/user.service';

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
  constructor(private serService: UserService,private router: Router) { }

  ngOnInit() {
    this.loadUser();
  }
  onItemChange(value) {
    this.sex = value;
  }
  save(name: string, phone: number, birthday: Date, address: string,image: File) {
    const gender = this.userRes.gender;
    const email = this.userRes.email;
    const newUser: User = { email, phone, name,gender,birthday,address,image} as User;
    console.log(newUser);
    // this.serService.Signup(newUser).subscribe((res) => (this.user = res),(error) => (this.showMessage = error));
    // if (this.showMessage == null) {
    //   alert("Đăng ký thành công!");
    //   this.router.navigate(["/login"]);
    // } else {
    //   alert(this.showMessage.error.message);
    // }
    // this.showMessage = null;
    // console.log(newUser);
    // console.log(this.showMessage);
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

}
