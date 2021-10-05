import { Component, OnInit } from '@angular/core';

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

}
