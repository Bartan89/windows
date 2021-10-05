import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dock',
  templateUrl: './dock.component.html',
  styleUrls: ['./dock.component.scss']
})
export class DockComponent implements OnInit {

  constructor() { }


  programs: { id: number, openPosX: number, openPosY: number }[] = []

  ngOnInit(): void {
  }

  open(event: { id: number, openPosX: number, openPosY: number }) {
    console.log(event)
    console.log(this.programs)
    this.programs = [...this.programs, event]

  }


  removeProgram(id: number) {
    console.log(event)
    interval(1000).pipe(
      tap(() => this.programs = [...this.programs.filter(p => p.id !== id)]),
      take(1),
    ).subscribe()
  }

}
