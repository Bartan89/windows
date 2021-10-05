import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dock-item',
  templateUrl: './dock-item.component.html',
  styleUrls: ['./dock-item.component.scss']
})
export class DockItemComponent implements OnInit {

  constructor() { }

  @Input() id: number | null = null
  @Output() openById = new EventEmitter<{ id: number, openPosX: number, openPosY: number }>();

  ngOnInit(): void {
  }


  openProgram(event: any) {
    if (this.id !== null) {
      this.openById.emit({ id: this.id, openPosX: event.clientX, openPosY: event.clientY })
    }
  }
}
