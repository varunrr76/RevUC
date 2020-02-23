import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private global: GlobalService) { }

  ngOnInit() {
  }

  openAR() {
    this.global.navigateToURL('/augment', []);
  }

  openCreditAR() {
    this.global.navigateToURL('/augment-credit', []);
  }

}
