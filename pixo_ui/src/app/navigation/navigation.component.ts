import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  mode = 'side'
  opened = false;
  layoutGap = '64';
  fixedInViewport = true;
  avatar: string;
  heading;
  username;

  constructor(router: Router, route: ActivatedRoute) {
    route.url.subscribe(() => {
      //console.log(route.snapshot.firstChild.data);
      this.heading = route.snapshot.firstChild.data['title'];
      this.username = localStorage.getItem('username');
      this.avatar = localStorage.getItem('picture');
    });

  }

  ngOnInit(): void {
    // to print only path eg:"/login"
  }

  toggleSidenav(): void {
    if(this.opened) this.opened = false;
    else this.opened = true;
  }

}
