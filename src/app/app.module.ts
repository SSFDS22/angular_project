import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {RemainingMessagePipe} from './remaining-message.pipe';
import {TodosFilterPipePipe} from './todos-filter.pipe';
import { PlogModule } from '@gpeel/plog';
import { environment } from 'src/environments/environment';
import { MyPerfModule } from '@gpeel/my-perf-tools';

@NgModule({
  declarations: [
    AppComponent,
    TodosFilterPipePipe,
    RemainingMessagePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PlogModule.forRoot(environment),
    NgbModule,
    FontAwesomeModule,
    MyPerfModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
