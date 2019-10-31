import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {

  selectedEventId: string;

  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {
    this.selectedEventId = this.route.snapshot.paramMap.get('id');
  }

}
