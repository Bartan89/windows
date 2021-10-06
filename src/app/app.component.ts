import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'windows';

  showInstructions = true;


  userCompletedInstructions(event: any) {
    this.showInstructions = false;
  }
}
