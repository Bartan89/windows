import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, fromEvent, interval, of, Subject } from 'rxjs';
import { delay, distinct, distinctUntilChanged, map, mergeMap, startWith, switchMap, take, takeUntil, takeWhile, tap, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



  leftCircle$ = new BehaviorSubject(false)



  rotation$$ = new BehaviorSubject(0)
  rotation$ = this.rotation$$.pipe(
    map(x => `rotate(${x}deg)`)
  )

  endTurnToggle = true;

  rotate$$ = new Subject()
  rotate$ = this.rotate$$.pipe(
    //distinctUntilChanged(),
    //throttleTime(1500),
    tap(console.log),
    switchMap((x: any) => {
      if (x <= 0) {
        return interval((20 + (x * 5))).pipe(tap((y) => {
          return this.rotation$$.next(this.rotation$$.value + (1 - (y * 0.005)))

        }), takeWhile(y => (y * 0.005) < 1),
          takeWhile(() => this.endTurnToggle))
      } else {
        return interval((20 - (x * 5))).pipe(tap((y) => {
          return this.rotation$$.next(this.rotation$$.value - (1 - (y * 0.005)))
        }), takeWhile(y => (y * 0.005) < 1),
          takeWhile(() => this.endTurnToggle)
        )
      }
    }),
  ).subscribe()

  $mousehelddown = new BehaviorSubject(false)

  mousedown$ = fromEvent(document, 'mousedown').pipe(
    tap(() => this.$mousehelddown.next(true))
  ).subscribe()

  mouseup$ = fromEvent(document, 'mouseup').pipe(
    tap(() => this.$mousehelddown.next(false))
  ).subscribe()


  enterCircle(event: any) {
    //console.log('inside', event.movementX)

    console.log('I am event', this.mousedown$)



    if (this.$mousehelddown.value) {
      this.rotate$$.next(event.movementX)
    }
    // offsetX

    // if (event.movementX > 0) {
    //   interval(event.movementX).pipe(
    //     tap(console.log)
    //   ).subscribe()
    // }


  }

  leftTheCircle() {
    this.leftCircle$.next(false)
  }

  endTurn() {

    this.endTurnToggle = false;

    of(1).pipe(
      delay(100),
      tap(() => this.endTurnToggle = true)
    ).subscribe()

  }


  goToLinkedIn() {
    console.log('workd')
  }
}
