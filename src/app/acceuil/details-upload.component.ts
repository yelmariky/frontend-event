import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent implements OnInit {

  @Input() fileUpload: string;
  filename:String;

  constructor() {}

  ngOnInit() {
    this.filename=this.fileUpload.slice(this.fileUpload.lastIndexOf("/")+1);
  }

}