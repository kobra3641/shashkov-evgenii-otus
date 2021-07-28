import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecentlyAddedComponent} from "./recently-added/recently-added.component";
import {GoComponent} from "./go/go.component";
import {SettingComponent} from "./setting/setting.component";

const routes: Routes = [
  { path: '', redirectTo: '/recently_added', pathMatch: 'full' },
  { path: 'recently_added', component: RecentlyAddedComponent },
  { path: 'go', component: GoComponent },
  { path: 'settings', component: SettingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
