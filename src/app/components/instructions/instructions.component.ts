import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { animationFrameScheduler, BehaviorSubject, defer, interval, Subject } from 'rxjs';
import { map, take, takeUntil, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  @Output() removeMe = new EventEmitter<boolean>()

  constructor() { }



  ngOnInit(): void {
  }


  fadeIn$ = new BehaviorSubject('')
  thumbEnd$ = new Subject()
  thumbBegins$ = new Subject()

  downBusy$ = new Subject()

  thumbSize$$ = new BehaviorSubject(2);
  thumbSize$ = this.thumbSize$$.pipe(
    map(s => `scale(${s})`)
  )

  thumbSizeDown$$ = new BehaviorSubject(2);
  thumbSizeDown$ = this.thumbSizeDown$$.pipe(
    map(s => `scale(${s})`)
  )

  enterThumb() {
    // interval(0, animationFrameScheduler).pipe(
    //   map(x => (x / 100) + 1),
    //   map(x => (Math.log(x) * 2) + 1),
    //   tap(x => this.thumbSize$$.next(x)),
    //   takeUntil(this.thumbEnd$),
    //   tap(x => x > 3 ? this.removeMe.emit(true) : null),
    //   takeWhile(x => x < 3)
    // ).subscribe()

    duration(2500).pipe(
      map(t => (t * 2) + 2),
      map(t => Math.log(t) + 2),
      tap(x => this.thumbSize$$.next(x)),
      tap(x => this.thumbSizeDown$$.next(x)),
      takeUntil(this.downBusy$),
      takeWhile(p => p < 4),
      tap(x => x > 3 ? this.removeMe.emit(true) : null),
      tap(console.log)
    ).subscribe()
  }


  desizeThumb() {
    this.thumbEnd$.next()

    this.downBusy$.next()

    duration(500).pipe(
      map(t => t * -1),
      map(t => (t * 2) + this.thumbSizeDown$$.value),
      tap(x => this.thumbSize$$.next(x)),
      takeWhile(p => p > 2),
      tap(console.log)
    ).subscribe()

    // interval(0, animationFrameScheduler).pipe(
    //   map(x => x * -1),
    //   map(x => (x / 100) + this.thumbSize$$.value),
    //   //map(x => (Math.log(x) * 2) + 1),
    //   tap(x => this.thumbSize$$.next(x)),
    //   takeUntil(this.thumbBegins$),
    //   //tap(console.log),
    //   takeWhile(x => x > 0.1)
    // ).subscribe()

    // interval(1000).pipe(
    //   tap(() => this.fadeIn$.next('fadeInThumb 0.5s ease-in forwards')),
    //   tap(() => this.thumbSize$$.next(2)),
    //   take(1)
    // ).subscribe()
  }

}


const duration = (ms: number) => defer(() => {
  const start = Date.now();
  return interval(0, animationFrameScheduler).pipe(
    map(() => (Date.now() - start) / ms),
    takeWhile(n => n <= 1)
  )
})

function elasticOut(t: number) {
  return Math.sin(-13.0 * (t + 1.0) * Math.PI / 2) * Math.pow(2.0, -10.0 * t) + 1.0
}