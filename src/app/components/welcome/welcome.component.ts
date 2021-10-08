import { Component, OnInit } from '@angular/core';
import { animationFrameScheduler, BehaviorSubject, defer, interval, of } from 'rxjs';
import { delay, map, mergeMap, take, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  greetings$$ = new BehaviorSubject<string[]>([])
  greetings$ = this.greetings$$.pipe(
    map(x => x.join(''))
  )

  ngOnInit(): void {


    const word = ['H', 'i', ',', ' ', 'W', 'e', 'l', 'c', 'o', 'm', 'e', '!'];

    interval(100).pipe(
      tap((i) => this.greetings$$.next([...this.greetings$$.value, word[i]])),
      take(word.length)
    ).subscribe()
  }

}


const duration = (ms: number) => defer(() => {
  const start = Date.now();
  return interval(0, animationFrameScheduler).pipe(
    map(() => (Date.now() - start) / ms),
    takeWhile(n => n <= 1)
  )
})