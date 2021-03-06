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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { DefaultLayoutAdminComponent } from './default-layout-admin/default-layout-admin.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { StorePageComponent } from './store-page/store-page.component';
import { BookSaleComponent } from './book-sale/book-sale.component';
import { BookAllComponent } from './book-all/book-all.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations' ;
import { MatSliderModule } from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { TokenInterceptorService } from './service/token-intercepter.service';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminEmployeeAccountComponent } from './admin-employee-account/admin-employee-account.component';
import { AdminAdminAccountComponent } from './admin-admin-account/admin-admin-account.component';
import { AdminStatisticsComponent } from './admin-statistics/admin-statistics.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { AdminStatProfitDayComponent } from './admin-statistics/admin-stat-profit-day/admin-stat-profit-day.component';
import { AdminStatProfitMonthComponent } from './admin-statistics/admin-stat-profit-month/admin-stat-profit-month.component';
import { AdminStatProfitYearComponent } from './admin-statistics/admin-stat-profit-year/admin-stat-profit-year.component';
import { AdminStatCustomersComponent } from './admin-statistics/admin-stat-customers/admin-stat-customers.component';
import { AdminStatProductsComponent } from './admin-statistics/admin-stat-products/admin-stat-products.component';
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
    DefaultLayoutAdminComponent,
    AdminOrderComponent,
    AdminUserComponent,
    StorePageComponent,
    BookSaleComponent,
    BookAllComponent,
    UserProfileComponent,
    UserSettingComponent,
    UserOrderComponent,
    LoginAdminComponent,
    CheckoutComponent,
    ForgotPasswordComponent,
    AdminEmployeeAccountComponent,
    AdminAdminAccountComponent,
    AdminStatisticsComponent,
    AdminStatProfitDayComponent,
    AdminStatProfitMonthComponent,
    AdminStatProfitYearComponent,
    AdminStatCustomersComponent,
    AdminStatProductsComponent,

  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSnackBarModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    ChartsModule
  ],
  providers: [DefaultLayoutUserComponent,ThemeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
