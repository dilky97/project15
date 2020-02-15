import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from 'rxjs/operators';

import { eventData } from "../../../models/event-details.model";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  imgSrc = '../../../../assets/profile.jpg';
  selectedImage: any = null;
  uploadPercentage: any;

  eventFile : eventData;
  eventID : string;

  imageForm = new FormGroup({
      imageUrl: new FormControl('', Validators.required )
    
  });

  // isHovering : boolean;

  // files: File[] = [];

  constructor(private storage: AngularFireStorage, private afs: AngularFirestore) { }

  ngOnInit() {
    this.eventID = localStorage.getItem("curEventId");
  }

  onSubmit(formData) {
    const filePath = `images/${this.selectedImage.name}_${new Date().getTime()}`;
    const task = this.storage.upload(filePath, this.selectedImage);
    this.uploadPercentage = task.percentageChanges();
    const fileRef = this.storage.ref(filePath);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe( url => {
          console.log(url);
          localStorage.setItem('tempURL', url);
          // this.resetForm();
          
        });
      })
    ).subscribe();

    this.afs.collection('events').doc(this.eventID).update({'image':localStorage.getItem("tempURL")});


  }

  showPreview(event: any, temp: any) {
    if ( event.target.files && event.target.files[0] ) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '../../../../assets/profile.jpg';
      this.selectedImage = null;
    }
    this.onSubmit(temp);
  }

  

  // toggleHover(event: boolean) {
  //   this.isHovering = event;
  // }

  // onDrop(files: FileList) {
  //   for (let i = 0; i < files.length; i++) {
  //     this.files.push(files.item(i));
  //   }
  // }

}
