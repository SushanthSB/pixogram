import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,NgForm } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [DatePipe]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
    loading = false;
    submitted = false;
  public username:string;
    @ViewChild('fileInput') fileInput;
    SERVER_URL = "http://localhost:8000/api/auth/uploadProfilePicture";
    today=new Date()
  constructor(   private formBuilder: FormBuilder,public datepipe: DatePipe,
    private router: Router,private authService: AuthServiceService,private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.required]
  });
  }
  get f() { return this.registerForm.controls; }

  onSubmit(form: NgForm) {
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('picture',this.validateProfilePic() );
    formData.append('username', form['username']);
    formData.append('password', form['password']);
    formData.append('email', form['email']);

    this.authService.register(formData)
      .subscribe(res => {
        // this.uploadProfilepicture(form['username'])
        this.router.navigate(['/dashboard/signin']);
      }, (err) => {
        console.log(err);
        alert(err.error);
      });
  }

  validateProfilePic() {
    let fileBrowser = this.fileInput.nativeElement;
    if(fileBrowser.files.length > 0) {
      const exts = ["jpeg", "jpg", "png"];
      let extSplit = fileBrowser.files[0].name.split(".");
      let ext = extSplit[extSplit.length - 1];
      if(exts.includes(ext.toLowerCase())) {
        return fileBrowser.files[0];
      }
      else {
        return null;
      }
    }
    else {
      return null;
    }
  }
  uploadProfilepicture(username){
    console.log(username)
    let fileBrowser = this.fileInput.nativeElement;
    if(fileBrowser.files[0]==undefined){}else{
    console.log(fileBrowser.files[0]);
    const extList = ["jpg", "jpeg", "png"];
    let ext = fileBrowser.files[0].name.split(".");
    ext = ext[ext.length - 1];
    console.log(ext);
    if (extList.includes(ext)) {
    const formData = new FormData();
    formData.append('mediafile',fileBrowser.files[0] );
    formData.append('username',username)
  
    formData.append('createddate',this.datepipe.transform(this.today, 'dd/MM/yyyy'))
    formData.append('createdtime',this.datepipe.transform(this.today, 'h:mm a'))
    

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res)
      ,
      (err) => console.log(err)
    );
    }
    else {
      alert("Unsupported File Extension");
  }
}
  }
}
