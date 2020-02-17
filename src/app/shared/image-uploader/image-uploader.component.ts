import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

    ///////// IMAGE UPLOADER - variables //////////
    imgSrc = '../../../../assets/profile.jpg';
    selectedImage: any = null;
    uploadPercentage: any;

    @Input( 'defaultPic' ) defaultPic: string ;

    imageForm = new FormGroup({
      imageUrl: new FormControl('', Validators.required)
    });
    ///////////////////////////////////////////////

  constructor(private storage: AngularFireStorage,) { }

  ngOnInit() {
    if (this.defaultPic) {
      this.imgSrc = this.defaultPic;
    }
  }

    /////////////////// image uploader functions - start //////////////////////
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
            formData.imageUrl = url ;
            // this.resetForm();
          });
        })
      ).subscribe();
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
        if (this.defaultPic) {
          this.imgSrc = this.defaultPic;
        } else {
          this.imgSrc = '../../../../assets/profile.jpg';
        }
        this.selectedImage = null;
      }
      this.onSubmit(temp);
    }
    /////////////////// image uploader functions - end //////////////////////

}
