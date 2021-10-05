import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { delay, distinctUntilChanged, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-dock-item',
  templateUrl: './dock-item.component.html',
  styleUrls: ['./dock-item.component.scss']
})
export class DockItemComponent implements OnInit {

  constructor() { }


  @Input() label: string = ''
  @Input() desc: string = ''
  @Input() id: number | null = null
  @Output() openById = new EventEmitter<{ id: number, openPosX: number, openPosY: number }>();

  ngOnInit(): void {
  }


  openProgram(event: any) {
    if (this.id !== null) {
      this.openById.emit({ id: this.id, openPosX: event.clientX, openPosY: event.clientY })
    }
  }

  metaText$$ = new Subject();
  metaText$ = this.metaText$$.pipe(
    distinctUntilChanged()
  )

  showMetaText() {
    this.metaText$$.next('show 0.3s ease-in forwards')
  }

  hideMetaText() {
    this.metaText$$.next('hide 0.5s ease-in forwards')
  }
}
