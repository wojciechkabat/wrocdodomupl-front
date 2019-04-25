import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from "./welcome/welcome.component";
import { LostPetsComponent } from "./pages/lost-pets/lost-pets.component";

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'lost', component: LostPetsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
