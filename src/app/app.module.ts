import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SysconpModule } from './modules/sysconp/sysconp.module';
import { LucideAngularModule, File, Home, Menu, UserCheck,FileIcon  } from 'lucide-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingInterceptor } from './modules/sysconp/loading.interceptor';
import { TokenInterceptor } from './modules/sysconp/token.interceptor';
import { ResetSenhaComponent } from './page/reset-senha/reset-senha.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetSenhaComponent
  ],
  imports: [
    LucideAngularModule.pick({File, Home, Menu, UserCheck}),
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    SysconpModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass:  TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  readonly FileIcon = FileIcon;
 }
