import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from "./pages/welcome/welcome.component";
import { PetMapComponent } from "./pages/pet-map/pet-map.component";

const routes: Routes = [
  { path: '', component: PetMapComponent },
  { path: 'confirmation', component: PetMapComponent },
  { path: 'lost', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
