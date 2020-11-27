import { Component, OnInit } from "@angular/core";
import { User } from "../models/user";
import { UserService } from "../service/user.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  sex: string;
  user: User;
  public showMessage;
  constructor(
    private route: ActivatedRoute,
    private serService: UserService,
    private router: Router
  ) {}

  ngOnInit() {}

  onItemChange(value) {
    this.sex = value;
  }
  async signup(
    name: string,
    phone: number,
    email: string,
    password: string,
    confirmPassword: string,
    birthday: string,
    address: string
  ) {
    const gender = this.sex;
    const newUser: User = {
      email,
      phone,
      password,
      confirmPassword,
      name,
      gender,
      birthday,
      address,
    } as User;
    await this.serService
      .Signup(newUser)
      .toPromise()
      .then(
        (res) => (this.user = res),
        (error) => (this.showMessage = error)
      );
    if (this.showMessage == null) {
      alert("Đăng ký thành công!");
      this.router.navigate(["/login"]);
    } else {
      alert(this.showMessage.error.message);
    }
    this.showMessage = null;
    console.log(newUser);
    console.log(this.showMessage);
  }
}
