import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceProviderDetails } from 'src/app/models/service-provider-details.model';
import {ServiceProviderService} from 'src/app/services/service-provider.service';

@Component({
  selector: 'app-serviceprovider-list',
  templateUrl: './serviceprovider-list.component.html',
  styleUrls: ['./serviceprovider-list.component.scss']
})
export class ServiceproviderListComponent implements OnInit {
  list: ServiceProviderDetails[];

  constructor(private service:ServiceProviderService,private router: Router,private firestore:AngularFirestore) { }

  ngOnInit() {

    this.service.getServiceproviders().subscribe(actionArray =>
      this.list=actionArray.map(item=>{
        return{
          id:item.payload.doc.id,
          ...item.payload.doc.data()
        } as ServiceProviderDetails;
     })
      )
  }

}
