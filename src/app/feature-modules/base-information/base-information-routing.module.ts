import { RouterModule, Routes } from '@angular/router';

 
 
import { EnumComponent } from './components/enum/enum.component';
import { NgModule } from '@angular/core';
import { UnitComponent } from './components/unit/unit.component';
 

const routes: Routes = [
  {path:"enum/:menuCode", component:EnumComponent},
//  { path: '', redirectTo: 'enum', pathMatch: 'full' },
  { path: 'unit', component:UnitComponent } ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseInformationRoutingModule { }
