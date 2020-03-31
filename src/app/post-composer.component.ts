import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UploadPhotoService } from './upload-photo.service';
import { PhotoUpload  } from 'tmaab.shared.models'

@Component({
  selector: 'app-post-composer',
  templateUrl: './post-composer.component.html',
  styleUrls: ['./post-composer.component.css']
})
export class PostComposerComponent implements OnInit, AfterViewInit {
  private photoUploads: PhotoUpload[] = [];
  private canSubmit: boolean = false;
  private message: string = '';
  private messages: string[] = [''];
  private messageEmpty: boolean = true;

  @ViewChild('editor',{ static : false}) editorElemRef: ElementRef;

  constructor(private photoUploadService: UploadPhotoService) {
    console.log(this.messages);
  }
  ngAfterViewInit(): void {
    console.log(this.editorElemRef);
  }

  ngOnInit() {
  }

  uploadFile(files: any): void {
    let newPhoto: PhotoUpload = {
      photoId: '',
      imageUrl: '',
      thumbUrl: ''
    };

    this.photoUploads.push(newPhoto);
    this.photoUploadService.uploadPhoto(files[0])
    .subscribe(resp => {
      console.log(resp);
      if (resp.error) {

      } else {
        newPhoto.photoId = resp.data.photoId;
        newPhoto.thumbUrl = resp.data.thumbUrl;
      }
    });
  }

  removePhoto(photo: PhotoUpload): void {
    this.photoUploads.splice(this.photoUploads.indexOf(photo), 1);
  }

  onMessageChange(event: KeyboardEvent): void {
    console.log(event);
    this.messageEmpty = this.isEmptyMessage();
    let message: string = this.editorElemRef.nativeElement.innerText;
   // message = message.trim();
    console.log(message);
    console.log(message.split('<br>'));
    //this.messages = message.split(/[\n\r]/g);
    this.messages = message.split('\n\r');
    this.messages.forEach(m => {
      console.log(m.trim());
    })
    if (this.messages[this.messages.length - 1] === '') {
      this.messages.splice(this.messages.length - 1, 1);
    }
    console.log(this.messages);
  }
  
  isEmptyMessage(): boolean {
    let message: string = this.editorElemRef.nativeElement.innerText;
    return message.trim().length == 0;
  }

  onMessageChange1(event): void {
    console.log(event);
  }

  submitPost(): void {
    console.log(this.message);
  }
}
