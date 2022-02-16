import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-multiplemediaupload',
  templateUrl: './multiplemediaupload.component.html',
  styleUrls: ['./multiplemediaupload.component.css'],
  providers: [DatePipe]
})
export class MultiplemediauploadComponent implements OnInit {

  desc:string
  title :string
  tags:string
 
  SERVER_URL = "http://localhost:8000/file/uploadMultipleFiles";
  uploadForm: FormGroup;  

  loading = false;
  submitted = false;
  @ViewChild('fileInput') fileInput;
  today=new Date()
  public username:string;
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      mediafile: [''],
      desc:['', Validators.required],
      title:['', Validators.required],
      tags:['']
  
    });
    this.username=localStorage.getItem('username')
  }
  get f() { return this.uploadForm.controls; }

 
  getFileType(ftype): string {
    ftype = ftype.toUpperCase();
    let category = ftype;
    if(["PDF"].includes(ftype))
        category = "PDF";
    if(["XLSX"].includes(ftype))
        category = "MS Excel";
    if(["CSV"].includes(ftype))
        category = "CSV";
    if(["JPG", "JPEG", "PNG"].includes(ftype))
        category = "Image";
    if(["DOC", "DOCX"].includes(ftype))
        category = "World Document";
    return category;
}

  onSubmit() {
    let fileBrowser = this.fileInput.nativeElement;
    
    const extList = ["jpg", "jpeg", "png","mp4","JPG"];
  
    
    const formData = new FormData();

    for(var i=0;i<fileBrowser.files.length;i++){
      let ext = fileBrowser.files[i].name.split(".");
      ext = ext[ext.length - 1];
    //  console.log(ext);
      if (extList.includes(ext)) {
     formData.append("files",fileBrowser.files[i],fileBrowser.files[i]['name'])
     }
     else{
        alert("Unsupported File Extension in one of the files");
     }
    }
    formData.append('desc',this.desc)
    formData.append('title',this.title)
    formData.append('tags',this.tags)
    formData.append('username',this.username)
    formData.append('createddate',this.datepipe.transform(this.today, 'dd/MM/yyyy'))
    formData.append('createdtime',this.datepipe.transform(this.today, 'h:mm a'))

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) =>  {console.log(res)
        if(res){
          alert("Uploaded successfully");
          this.desc=''
          this.title=''
          this.tags=''
          fileBrowser=[];
        }
      },
      (err) => console.log(err)
    );
   
  }


}
