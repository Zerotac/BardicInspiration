import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonGrid, IonCol, IonRow } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { NavparamService } from '../../../services/navparam.service';
import { JsonHelperService } from '../../services/json-helper.service';
import { DndClass, SubClass } from '../../models';
import {ProgressbarComponent} from '../../components/progressbar/progressbar.component';

@Component({
  selector: 'app-name',
  templateUrl: './name.page.html',
  styleUrls: ['./name.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonInput, IonGrid, IonCol, IonRow, ProgressbarComponent]
})
export class NamePage implements OnInit {
  charName: string = "";

  /**
   * URLs of the different JSON files in the assetf foler:
   *   urlJSON: contains DnD-class & DnD-subclass data
   *   tropesURL: contains data of the tropes
   *   funfactsURL: contains data of DnD-funfacts 
   */
  urlJSON: string = '../../assets/subclassJSON.json';
  tropesURL: string = '../../assets/tropesJSON.json'
  funfactsURL: string = '../../assets/funfactJSON.json'

  classArray: DndClass[] = [];

   //defines how many elements of the progress bar are filled (true)
  progressElements: boolean[] = [true, true, false, false, false, false, false, false, false];

  constructor(private router: Router,
    private navParamService: NavparamService,
    private jsonHelperService: JsonHelperService,
  ) { }

  ngOnInit() {
    if (this.navParamService.getCharName() != "") {
      this.charName = this.navParamService.getCharName();

    }
    this.navParamService.setProgressBar(this.progressElements);
    //Read the JSON files. Call happens so early to ensure that data is already available for later pages.
    this.jsonHelperService.readClassJSON(this.urlJSON);
    this.jsonHelperService.readTropesJSON(this.tropesURL);
    this.jsonHelperService.readFunfactJSON(this.funfactsURL);

  }

  /**
   * Navgate to the next page (pronouns) & save the chosen name for the character.
   */
  nextPageButton() {
    this.navParamService.setCharName(this.charName);
    this.router.navigate(['pronoun']);
  }

}
