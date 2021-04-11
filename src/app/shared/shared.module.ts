import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ HeaderComponent, FooterComponent, SidebarComponent, ToggleFullscreenDirective, SearchbarComponent ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports:[ HeaderComponent, FooterComponent, SidebarComponent, SearchbarComponent ]
})
export class SharedModule { }
