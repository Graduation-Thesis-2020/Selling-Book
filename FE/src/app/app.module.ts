import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Book1Component } from './book1/book1.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { ListBookComponent } from './admin-book/list-book/list-book.component';
import { AddBookComponent } from './admin-book/add-book/add-book.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { CreateBookComponent } from './admin-book/create-book/create-book.component';
import { ListAuthorComponent } from './admin-author/list-author/list-author.component';
import { AddAuthorComponent } from './admin-author/add-author/add-author.component';
import { EditAuthorComponent } from './admin-author/edit-author/edit-author.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ListCateComponent } from './admin-category/list-cate/list-cate.component';
import { AddCateComponent } from './admin-category/add-cate/add-cate.component';
import { EditCateComponent } from './admin-category/edit-cate/edit-cate.component';
import { ListPubComponent } from './admin-publisher/list-pub/list-pub.component';
import { AddPubComponent } from './admin-publisher/add-pub/add-pub.component';
import { EditPubComponent } from './admin-publisher/edit-pub/edit-pub.component';
import { BookAuthorComponent } from './book-author/book-author.component';
import { BookPubComponent } from './book-pub/book-pub.component';
import { AdminReviewComponent } from './admin-review/admin-review.component';
import { EditBookComponent } from './admin-book/edit-book/edit-book.component';
import { DefaultLayoutUserComponent } from './default-layout-user/default-layout-user.component';
import { InfoCartComponent } from './info-cart/info-cart.component';


@NgModule({
  declarations: [
    AppComponent,
    Book1Component,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    ProductDetailsComponent,
    AdminBooksComponent,
    ListBookComponent,
    AddBookComponent,
    CreateBookComponent,
    ListAuthorComponent,
    AddAuthorComponent,
    EditAuthorComponent,
    AdminPageComponent,
    ListCateComponent,
    AddCateComponent,
    EditCateComponent,
    ListPubComponent,
    AddPubComponent,
    EditPubComponent,
    BookAuthorComponent,
    BookPubComponent,
    AdminReviewComponent,
    EditBookComponent,
    DefaultLayoutUserComponent,
    InfoCartComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
