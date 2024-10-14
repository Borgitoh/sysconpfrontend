import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { FormsModule } from '@angular/forms';
import { SysconpModule } from './modules/sysconp/sysconp.module';
import { LucideAngularModule, File, Home, Menu, UserCheck,FileIcon  } from 'lucide-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './modules/sysconp/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    LucideAngularModule.pick({File, Home, Menu, UserCheck}), 
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    SysconpModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  readonly FileIcon = FileIcon;
 }
