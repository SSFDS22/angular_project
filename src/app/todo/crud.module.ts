import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MyPerfModule} from '@gpeel/my-perf-tools';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CrudContainerComponent} from './crud-container/crud-container.component';
import {CreateComponent} from './dumbs/create/create.component';
import {ListComponent} from './dumbs/list/list.component';
import {RemainingMessagePipe} from './dumbs/list/remaining-message.pipe';
import {TodosFilterPipePipe} from './dumbs/list/todos-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    // @gpeel
    MyPerfModule
  ],
  declarations: [
    TodosFilterPipePipe,
    RemainingMessagePipe,
    CrudContainerComponent,
    CreateComponent,
    ListComponent,
  ],
  providers: [],
  exports: [
    CrudContainerComponent,
  ]
})
export class CrudModule {
}
