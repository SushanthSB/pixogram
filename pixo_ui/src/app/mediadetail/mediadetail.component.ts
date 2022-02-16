import { Component, OnInit } from '@angular/core';
import {MediaserviceService} from '../services/mediaservice.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-mediadetail',
  templateUrl: './mediadetail.component.html',
  styleUrls: ['./mediadetail.component.css']
})
export class MediadetailComponent implements OnInit {
  mediaDetails=[]
  constructor(private mediaservice:MediaserviceService,private router:Router) { 
    this.mediaDetails=this.mediaservice.getData()
    console.log(this.mediaDetails)
  }

  ngOnInit(): void {

  }

}
