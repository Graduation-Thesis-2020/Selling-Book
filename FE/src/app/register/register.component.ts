import { Component, OnInit } from "@angular/core";
import { User } from "../models/user";
import { UserService } from "../service/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  sex: string = null;
  user: User;
  registerForm: FormGroup;
  public showMessage;
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  hero = { name: "", phone: "", email: "", password: "", confirmPassword: "" };
  constructor(
    private route: ActivatedRoute,
    private serService: UserService,
    private router: Router,private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl(this.hero.name, [
        Validators.required,
        Validators.minLength(4),
      ]),
      phone: new FormControl(this.hero.phone, [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern("[0-9]*"),
      ]),
      email: new FormControl(this.hero.email, [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
      ]),
      password: new FormControl(this.hero.password, [Validators.required]),
      confirmpassword: new FormControl(this.hero.confirmPassword, [
        Validators.required,
      ]),
      // address: new FormControl(this.profile.address, Validators.required)
    });
  }
  get name() {
    return this.registerForm.get("name");
  }
  get phone() {
    return this.registerForm.get("phone");
  }
  get email() {
    return this.registerForm.get("email");
  }
  get password() {
    return this.registerForm.get("password");
  }
  get confirmPassword() {
    return this.registerForm.get("confirmPassword");
  }

  onItemChange(value) {
    this.sex = value;
  }
  // async signup(name: string,phone: string,email: string, password: string,confirmPassword: string,birthday: Date,address: string) {
  //   const gender = this.sex;
  //   const newUser: User = {email,phone,password,confirmPassword,name,gender,birthday,address,} as User;
  //   await this.serService.Signup(newUser).toPromise().then(
  //       (res) => (this.user = res),
  //       (error) => (this.showMessage = error)
  //     );
  //   if (this.showMessage == null) {
  //     alert("Đăng ký thành công!");
  //     this.router.navigate(["/login"]);
  //   } else {
  //     alert(this.showMessage.error.message);
  //   }
  //   this.showMessage = null;
  //   console.log(newUser);
  //   console.log(this.showMessage);
  // }

  confirm(   birthday: Date,address: string){
    const gender = this.sex;
    const email = this.hero.email;
    const phone = this.hero.phone;
    const password = this.hero.password;
    const confirmPassword = this.hero.confirmPassword;
    const name = this.hero.name;
    const newUser: User = {email,phone,password,confirmPassword,name,gender,birthday,address,} as User;
    console.log(newUser);
    this.serService.Signup(newUser).subscribe( res => {
      this.user = res;
      let snackBarRef =  this._snackBar.open("Đăng ký thành công","Đăng Nhập", {
        panelClass: "snackbarConfig1",
        duration: 10000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      snackBarRef.onAction().subscribe(()=> this.router.navigate(['/login']));
      },
      (error) => {
        this.showMessage = error;
        this._snackBar.open(this.showMessage.error.message,"Đóng", {
          panelClass: "snackbarErrorConfig",
          duration: 5000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        console.log(this.showMessage);
        this.showMessage = null;
      }
    );


  }
}
