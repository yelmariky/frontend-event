import {Component, OnInit, Input, OnDestroy,Output,EventEmitter, ViewChild} from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType,HttpErrorResponse } from '@angular/common/http';
import { UploadService } from '../services/upload.service';

import {Configuration} from '../app.constants';



@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit,OnDestroy {
  @Input() iduser: string;
  @ViewChild('fileInput') fileInput;
 // @Input()  nbFiledUpload: number;
  //@Output() nbFiledUpload = new EventEmitter<number>();

  nbFiledUpload: number;
  selectedFiles: FileList;
  currentFileUpload: File;
  errormessage: String;
  displayError : boolean;
  fileUploads: string[];
  quotaError:boolean;
  mesgquotaevent:string;
  progress: { percentage: number } = { percentage: 0 }

  constructor(private uploadService: UploadService,private config:Configuration) { 
    console.log('constructor upload');
  }

  ngOnInit() {
    console.log('init upload');
    this.nbFiledUpload=0;
    this.quotaError=false;
    this.mesgquotaevent='';
   
  
  }

  selectFile(event) { 
    
    this.selectedFiles = event.target.files;
    
  }

  upload() {
    const fileBrowser = this.fileInput.nativeElement;
    this.progress.percentage = 0;
    
    if (fileBrowser.files && fileBrowser.files[0]) {
     
      this.currentFileUpload = fileBrowser.files[0];
      
      this.uploadService.pushFileToStorage(this.currentFileUpload,this.iduser).subscribe(event => {
        document.getElementById("progess_bar").style.visibility = "visible";
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.displayError=false;
        
          (<HTMLInputElement> document.getElementById("uploadbu")).disabled = true;
          fileBrowser.disabled = true;
        

         this.uploadService.getNbreUploadFiles(this.iduser).subscribe(data =>{console.log('length: '+data);if (data >= 3) { this.mesgquotaevent=this.config.QUOTA_NOMBRE_EVENT;this.quotaError=true};})
        
          console.log('File is completely uploaded!');
        }
       
       
       
      },
      
      (err: HttpErrorResponse) => {
        this.displayError=true;
        this.errormessage=err.message;
        console.log(err.message);
      
      }
    );

     
    }
  

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.uploadService.subjectnbUplod.unsubscribe();
    this.uploadService.subjectUplod.unsubscribe();
    
  }

}