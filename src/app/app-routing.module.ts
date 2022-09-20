import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import { UploadComponent } from './components/upload/upload.component';
import { HistoryComponent } from './components/history/history.component';
import {TabComponent} from 'src/app/components/tab/tab.component';

const routes: Routes = [
  { path: '', component: TabComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

