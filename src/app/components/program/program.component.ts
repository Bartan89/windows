import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { animationFrameScheduler, BehaviorSubject, fromEvent, interval, of, Subject } from 'rxjs';
import { concatMap, map, mergeMap, startWith, switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators'

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit, OnDestroy {

  constructor() { }


  @Input() metaData: { openPosX: number, openPosY: number, id: number } = { openPosX: 0, openPosY: 0, id: 0 }
  @Output() removeMe = new EventEmitter<number>()


  destroy$ = new Subject();

  ngOnInit(): void {
    console.log(this.metaData.openPosX)

    this.closeWindow$.next('scale 0.3s ease-out forwards')
    this.position$$.next({ x: this.metaData.openPosX, y: this.metaData.openPosY })
    interval(0, animationFrameScheduler).pipe(
      map(x => x ** 2),
      map(x => x - this.metaData.openPosY),
      map(x => x * -1),
      tap(console.log),
      takeWhile(x => x > 0),
      tap((increment) => this.position$$.next({ x: this.metaData.openPosX - 200, y: increment }))
    ).subscribe()
  }



  end$ = fromEvent(window, 'mouseup').pipe(
    tap(() => this.startDrag$$.next(false))
  ).subscribe()


  absolutePosition$ = fromEvent(window, 'mousemove').pipe(
    tap((p: any) => this.position$$.next({ x: (p.screenX), y: (p.screenY - 160) }))
  )


  startDrag$$ = new BehaviorSubject<boolean>(false)
  startDrag$ = this.startDrag$$.pipe(
    switchMap((x) => x ? this.absolutePosition$ : of(null)),
  ).subscribe()


  position$$ = new BehaviorSubject<{ x: number, y: number }>({ x: 0, y: 0 })
  position$ = this.position$$.pipe(
    map(p => `translate(${p.x}px, ${p.y}px)`),
  )

  closeWindow$ = new BehaviorSubject('')


  dragStart(event: { screenX: number, screenY: number }) {
    this.startDrag$$.next(true);
  }

  closeWindow(event: { screenX: number, screenY: number }) {
    console.log(event)

    this.closeWindow$.next('close 0.3s ease-out forwards')
    this.removeMe.emit(this.metaData.id);

    interval(0, animationFrameScheduler).pipe(

      map(x => x ** 1.8),
      map(x => x + event.screenY),
      tap(console.log),
      takeUntil(this.destroy$),
      tap((increment) => this.position$$.next({ x: event.screenX - 210, y: increment }))
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
  }

}


