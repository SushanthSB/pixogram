import { Component, OnInit } from '@angular/core';
import { MediaserviceService } from '../services/mediaservice.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-mymedia',
  templateUrl: './mymedia.component.html',
  styleUrls: ['./mymedia.component.css']
})
export class MymediaComponent implements OnInit {

  username: string = localStorage.getItem('username')
  allPosts = []
  constructor(private mediaservice: MediaserviceService, private router: Router) {
    console.log("media constructor");
    this.mediaservice.getAllFiles().toPromise().then((res) => {
      console.log(res)
      this.allPosts = res
    })
  }

  ngOnInit(): void {
    console.log("media init");
  }

  openMediaDetail(allmedia) {
    this.mediaservice.setData(allmedia)
    this.router.navigate(['dashboard/mediadetail'])

  }
}
