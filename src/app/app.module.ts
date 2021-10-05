import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DockComponent } from './components/dock/dock.component';
import { DockItemComponent } from './components/dock-item/dock-item.component';
import { ProgramComponent } from './components/program/program.component';

@NgModule({
  declarations: [
    AppComponent,
    DockComponent,
    DockItemComponent,
    ProgramComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
