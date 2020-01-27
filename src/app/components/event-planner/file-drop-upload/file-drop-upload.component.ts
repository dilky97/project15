import { Component, OnInit, Input, ChangeDetectorRef,  Output, EventEmitter} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";

import { async } from "q";


@Component({
  selector: 'app-file-drop-upload',
  //template: '<input type="file" (change)="uploadFile($event)"/><div> {{uploadPercent | async}}</div><a [href] = "downloadURL | async" >{{downloadURL|async}} </a>'
  templateUrl: './file-drop-upload.component.html',
  styleUrls: ['./file-drop-upload.component.scss']
})
export class FileDropUploadComponent implements OnInit{

  @Input() file = File;

  task : AngularFireUploadTask;
  uploadPercent : Observable<number>;
  snapshot : Observable<any>;
  downloadURL : string;

  message: string = ""



  @Output() messageEvent = new EventEmitter<string>();
  
  constructor(private fileStorage: AngularFireStorage,private datastore: AngularFirestore) { }

  ngOnInit(){
    this.startUpload();

    this.messageEvent.emit("ndjjefop");
  }

  startUpload(){

    // const inputfile = event.item(0);
    // if(inputfile.type.split('/')[0] !== 'image'){
    //   console.error('unsupported file type')
    //   return;
    // }
    

    const filePath = 'uploads/${Date.now()}_${this.file.name}';
    const fileRef = this.fileStorage.ref(filePath);

    this.task = this.fileStorage.upload(filePath, this.file);
    //this.task = fileRef.put(this.file);

    this.uploadPercent = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize( async() => {

        this.downloadURL = await fileRef.getDownloadURL().toPromise();

        console.log("url sr " + this.downloadURL);
        this.message = this.downloadURL;
        console.log("url sr " + this.message);
        this.messageEvent.emit(this.message);

        this.datastore.collection('files').add({downloadURL:this.downloadURL,filePath});

      }),

    );


  }


  isActive(snapshot){
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }




  

}
