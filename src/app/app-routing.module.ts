import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LostPetsComponent } from "./pages/lost-pets/lost-pets.component";
import { WelcomeComponent } from "./pages/welcome/welcome.component";

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'lost', component: LostPetsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
