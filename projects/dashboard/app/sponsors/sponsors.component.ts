import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons,NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { map } from "rxjs/operators";

import { AngularFirestore } from "@angular/fire/firestore";
import { DashboardService } from "../dashboard.service";
import { sponsorData } from "../app.model";



@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit{

  closeResult: string;

  sponsorList : sponsorData[];

  constructor(private modalService: NgbModal,private sponsorService:DashboardService, private sponsorStore:AngularFirestore) {

  }

  ngOnInit(){

    this.sponsorService.getSponsors().subscribe( actionArray =>{
      this.sponsorList = actionArray.map( sponsor => {
        return{
          id: sponsor.payload.doc.id,
          ...sponsor.payload.doc.data()
        } as sponsorData;
      })
    });



  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}



