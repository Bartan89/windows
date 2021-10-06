import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DockComponent } from './components/dock/dock.component';
import { DockItemComponent } from './components/dock-item/dock-item.component';
import { ProgramComponent } from './components/program/program.component';
import { MatIconModule } from "@angular/material/icon";
import { LanguageComponent } from './components/language/language.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    DockComponent,
    DockItemComponent,
    ProgramComponent,
    LanguageComponent,
    InstructionsComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
