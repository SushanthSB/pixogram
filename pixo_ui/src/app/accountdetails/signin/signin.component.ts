import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,NgForm } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, 
    private authService: AuthServiceService, 
    private notificationService: NotificationService) { 

    }

  ngOnInit(): void {
    if(localStorage.getItem('username') && localStorage.getItem('token')){
      console.log("calling")
      this.router.navigate(['dashboard/mymedia']);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  get f() { return this.loginForm.controls; }

  onSubmit(form: NgForm) {

    this.authService.login(form)
      .subscribe(res => {
        console.log(res)
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.username);
          localStorage.setItem('picture', res.picture);
          this.router.navigate(['dashboard/mymedia']);
        }
      }, (err) => {
        console.log(err);
        this.notificationService.error("Invalid credentials.");
      });
  }
}
