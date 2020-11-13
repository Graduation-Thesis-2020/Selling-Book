import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Book1Component } from './book1/book1.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { ListBookComponent } from './admin-book/list-book/list-book.component';
import { AddBookComponent } from './admin-book/add-book/add-book.component';
import { CreateBookComponent } from './admin-book/create-book/create-book.component';
import { ListAuthorComponent } from './admin-author/list-author/list-author.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AddAuthorComponent } from './admin-author/add-author/add-author.component';
import { EditAuthorComponent } from './admin-author/edit-author/edit-author.component';
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
import { CartService } from './service/cart.service';
import { DefaultLayoutUserComponent } from './default-layout-user/default-layout-user.component';
import { InfoCartComponent } from './info-cart/info-cart.component';


const routes: Routes = [

  //{path: 'home', component: HomeComponent, canActivate:[]},
  {path: 'login', component: LoginComponent},
  {path: '',
  component: DefaultLayoutUserComponent,
  children:[
    {
      path: 'home', component: HomeComponent, canActivate:[],
    },
    {path: 'book1', component: Book1Component},
    {path: 'books/:id/categories/:id1', component: Book1Component},
    {path: 'books/:id/categories/:id1', component: Book1Component},
    {path: 'books/:id/authors/:id1', component: BookAuthorComponent},
    {path: 'books/:id/publishers/:id1', component: BookPubComponent},
    {path: 'infocarts', component: InfoCartComponent},
    {path: 'carts/:id', component: CartComponent},
    {path: 'cart', component: CartComponent},
    {path: 'details/:id', component: ProductDetailsComponent},
  ]},
  {path: 'register', component: RegisterComponent},

  {path: 'admin/listreview', component: AdminReviewComponent},
  {path: 'adminbooks', component: AdminBooksComponent},
  {path: 'admin/listbook', component: ListBookComponent},
  {path: 'admin/addbook', component: AddBookComponent},
  {path: 'admin/createbook', component: CreateBookComponent},
  {path: 'admin/listauthor', component: ListAuthorComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: 'admin/addauthor', component: AddAuthorComponent},
  {path: 'admin/editauthor/:id', component: EditAuthorComponent},
  {path: 'admin/listcate', component: ListCateComponent},
  {path: 'admin/addcate', component: AddCateComponent},
  {path: 'admin/editcate/:id', component: EditCateComponent},
  {path: 'admin/listpub', component: ListPubComponent},
  {path: 'admin/addpub', component: AddPubComponent},
  {path: 'admin/editpub/:id', component: EditPubComponent},
  {path: 'admin/editbook/:id', component: EditBookComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
