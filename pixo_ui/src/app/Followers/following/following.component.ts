import { CommentStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MediaserviceService } from 'src/app/services/mediaservice.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  allusers;
  allprofilepics;
  userswithprofilepic=[];

  constructor(private mediaservice:MediaserviceService) { 

    this.mediaservice.getAllUsers().toPromise().then((res)=>{
    //  console.log(res)
      this.allusers=res

      this.mediaservice.getAllUsersProfilePictures().toPromise().then((res1)=>{
        this.allprofilepics=res1
       // console.log(this.allprofilepics)
        for(var i=0;i<this.allusers.length;i++){
          for(var j=0;j<this.allprofilepics.length;j++){
            console.log(this.allusers)
             if(this.allusers[i]['username']==this.allprofilepics[j]['username'])
             {
               
               this.userswithprofilepic.push({'username':this.allusers[i]['username'],'firstname':this.allusers[i]['firstName'],'lastname':this.allusers[i]['lastName'],'profilepic':this.allprofilepics[j]['fileDownloadUri']})
               console.log(this.userswithprofilepic)
             }
             else{
              this.userswithprofilepic.push({'username':this.allusers[i]['username'],'firstname':this.allusers[i]['firstName'],'lastname':this.allusers[i]['lastName'],'profilepic':'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'})
            //  console.log(this.userswithprofilepic)
             }
          }
        }
        
    
     
      })
    })
   
  }

  ngOnInit(): void {


  }
  followUser(value){

  }

}
