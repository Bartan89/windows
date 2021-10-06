import { Component } from '@angular/core';
import { interval, of } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'windows';

  showInstructions = true;


  userCompletedInstructions(event: any) {
    of(1).pipe(
      delay(50),
      tap(() => this.showInstructions = false)
    ).subscribe()
  }
}
