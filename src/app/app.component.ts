import {Component} from '@angular/core';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {Plog} from '@gpeel/plog';

/**
 * Note-4 : also I could have used a modal instead of a simple input to edit the label.
 */
@Component({
  selector: 'app-root',
  template: `
    <root-refresh-count></root-refresh-count>
    <section class="bg-image">
      <div class="container py-5">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col col-8">

            <header class="custom-header">
              <div class="container">
                <h2 class="custom-h1">Todo App is Angular coffee machine
                  <fa-icon [icon]="faCoffee"></fa-icon>
                </h2>
              </div>
            </header>

            <app-crud></app-crud>

          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faCoffee = faCoffee;

  constructor() {
    Plog.action('AppComponent constructor => Plog works!');
  }

}
