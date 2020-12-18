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
import { DefaultLayoutAdminComponent } from './default-layout-admin/default-layout-admin.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { BookSaleComponent } from './book-sale/book-sale.component';
import { BookAllComponent } from './book-all/book-all.component';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard, AuthAdminGuard, ChildGuard, AuthAdminFunctionGuard } from './service/auth-guard';
const routes: Routes = [

  //{path: 'home', component: HomeComponent, canActivate:[]},
  {path: 'login', component: LoginComponent},
  {path: 'forgotpassword', component: ForgotPasswordComponent},
  {path: '',
  component: DefaultLayoutUserComponent,
  children:[
    {
      path: 'home', component: HomeComponent,
    },
    {path: 'book1', component: Book1Component},
    {path: 'books', component: BookAllComponent},
    {path: 'sale', component: BookSaleComponent},
    {path: 'books/:id/categories/:id1', component: Book1Component},
    {path: 'books/:id/categories/:id1', component: Book1Component},
    {path: 'books/:id/authors/:id1', component: BookAuthorComponent},
    {path: 'books/:id/publishers/:id1', component: BookPubComponent},
    {path: 'infocarts', component: InfoCartComponent , canActivate: [AuthGuard]},
    {path: 'carts/:id', component: CartComponent},
    {path: 'cart', component: CartComponent},
    {path: 'details/:id', component: ProductDetailsComponent},
    {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard],},
    {path: 'setting', component: UserSettingComponent, canActivate: [AuthGuard],
    children:[
      {path: '', component: UserProfileComponent},
      {path: 'profile', component: UserProfileComponent},
      {path: 'order', component: UserOrderComponent}
    ]},
  ]},
  {path: 'register', component: RegisterComponent},
  {path: 'login/admin', component: LoginAdminComponent},
  {path: 'admin',
  component: DefaultLayoutAdminComponent, canActivate: [AuthAdminGuard],
  children: [
    {path: '', component: AdminOrderComponent},
    {path: 'listreview', component: AdminReviewComponent},
    {path: 'adminbooks', component: AdminBooksComponent},
    {path: 'listbook', component: ListBookComponent},
    {path: 'addbook', component: AddBookComponent},
    {path: 'createbook', component: CreateBookComponent},
    {path: 'listauthor', component: ListAuthorComponent},
    //{path: 'admin', component: AdminPageComponent},
    {path: 'addauthor', component: AddAuthorComponent},
    {path: 'editauthor/:id', component: EditAuthorComponent},
    {path: 'listcate', component: ListCateComponent},
    {path: 'addcate', component: AddCateComponent},
    {path: 'editcate/:id', component: EditCateComponent},
    {path: 'listpub', component: ListPubComponent},
    {path: 'addpub', component: AddPubComponent},
    {path: 'editpub/:id', component: EditPubComponent},
    {path: 'editbook/:id', component: EditBookComponent},
    {path: 'order', component: AdminOrderComponent},
    {path: 'customer', component: AdminUserComponent, canActivate: [AuthAdminFunctionGuard]},
  ]},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthAdminGuard, ChildGuard, AuthAdminFunctionGuard]
})
export class AppRoutingModule { }
