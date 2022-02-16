import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaserviceService } from '../../services/mediaservice.service'

import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-singlemediaupload',
  templateUrl: './singlemediaupload.component.html',
  styleUrls: ['./singlemediaupload.component.css'],
  providers: [DatePipe]
})
export class SinglemediauploadComponent implements OnInit {

  desc: string
  title: string
  tags: string

  SERVER_URL = environment.apiUrl + "/api/media/uploadFile";
  uploadForm: FormGroup;

  loading = false;
  submitted = false;
  public username: string;
  @ViewChild('fileInput') fileInput;
  today = new Date()
  constructor(public datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private notificationService: NotificationService) { }

  ngOnInit() {

    this.uploadForm = this.formBuilder.group({
      mediafile: [''],
      desc: ['', Validators.required],
      title: ['', Validators.required],
      tags: ['']

    });
    this.username = localStorage.getItem('username')
  }
  get f() { return this.uploadForm.controls; }


  getFileType(ftype): string {
    ftype = ftype.toUpperCase();
    let category = ftype;
    if (["PDF"].includes(ftype))
      category = "PDF";
    if (["XLSX"].includes(ftype))
      category = "MS Excel";
    if (["CSV"].includes(ftype))
      category = "CSV";
    if (["JPG", "JPEG", "PNG"].includes(ftype))
      category = "Image";
    if (["DOC", "DOCX"].includes(ftype))
      category = "World Document";
    return category;
  }

  onSubmit() {
    let fileBrowser = this.fileInput.nativeElement;
    console.log(fileBrowser.files[0]);
    const extList = ["jpg", "jpeg", "png", "mp4"];
    let ext = fileBrowser.files[0].name.split(".");
    ext = ext[ext.length - 1];
    console.log(ext);
    if (extList.includes(ext)) {
      const formData = new FormData();
      formData.append('mediafile', fileBrowser.files[0]);
      formData.append('desc', this.desc)
      formData.append('title', this.title)
      formData.append('tags', this.tags)
      formData.append('username', this.username)
      formData.append('createddate', this.datepipe.transform(this.today, 'dd/MM/yyyy'))
      formData.append('createdtime', this.datepipe.transform(this.today, 'h:mm a'))


      this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
        (res) => {
          console.log(res)
          if (res) {
            this.notificationService.error("Uploaded successfully");
            this.desc = ''
            this.title = ''
            this.tags = ''
            fileBrowser = [];
          }
        },
        (err) => {
          this.notificationService.error("Server error");
        }
      );
    }
    else {
      this.notificationService.error("Unsupported File Extension");
    }
  }

}
