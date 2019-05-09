import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetMapComponent } from "./pages/pet-map/pet-map.component";
import { RulesComponent } from "./pages/rules/rules.component";
import { AboutComponent } from "./pages/about/about.component";

const routes: Routes = [
  { path: '', component: PetMapComponent },
  { path: 'confirmation', component: PetMapComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
