import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachProfileComponent } from './coachProfile.component';

const routes: Routes = [
  {
    path: '',
    component: CoachProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoachProfileRoutingModule {}