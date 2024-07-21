import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon } from '@ionic/angular/standalone';
import {radioButtonOffOutline, radioButtonOnOutline} from 'ionicons/icons';
import {addIcons} from 'ionicons';

import { NavparamService } from '../../../services/navparam.service';

@Component({
  standalone: true,
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
  imports: [CommonModule, FormsModule,IonIcon],
})
export class ProgressbarComponent  implements OnInit {

  progressElements: boolean[] = [];

  constructor(private navParamService: NavparamService) { addIcons({radioButtonOffOutline,radioButtonOnOutline })}
  
  ngOnInit() {
    this.progressElements = this.navParamService.getProgressBar();
  }




  //radio-button-off-outline




}
