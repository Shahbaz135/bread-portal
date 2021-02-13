import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";


@NgModule({
  declarations: [ HeaderComponent, FooterComponent, SidebarComponent, ToggleFullscreenDirective ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[ HeaderComponent, FooterComponent, SidebarComponent ]
})
export class SharedModule { }
