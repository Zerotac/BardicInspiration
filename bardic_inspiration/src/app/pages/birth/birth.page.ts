import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonButton } from '@ionic/angular/standalone';
import {ProgressbarComponent} from '../../components/progressbar/progressbar.component';


import { NavparamService } from '../../../services/navparam.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-birth',
  templateUrl: './birth.page.html',
  styleUrls: ['./birth.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, ProgressbarComponent, CommonModule, FormsModule, IonGrid, IonCol, IonRow, IonButton]
})
export class BirthPage implements OnInit {


  charName: string = ""

  //Ancestry/Race

  dwarfSelected: boolean = false;
  elfSelected: boolean = false;
  humanSelected: boolean = false;

  race: string = "";

  //Birthplace

  birthplaceSelected: boolean = false;
  forestSelected: boolean = false;
  mountainSelected: boolean = false;

  birthplace: string = "";

   //defines how many elements of the progress bar are filled (true)
  progressElements: boolean[] = [true, true, true, true, false, false, false, false, false];
  constructor(private router: Router,
    private navParamService: NavparamService) { }

  ngOnInit() {
    //get the character name 
    this.charName = this.navParamService.getCharName();
    this.navParamService.setProgressBar(this.progressElements);

  }

  /**
   * User selects the ancestry "dwarf"
   */
  dwarfClick() {
    this.resetRaces();
    if (this.dwarfSelected == false) {
      this.race = "dwarf";
      this.dwarfSelected = true;
    }

  }

  /**
     * User selects the ancestry "elf"
     */
  elfClick() {
    this.resetRaces();
    if (this.elfSelected == false) {

      this.race = "elf";

      this.elfSelected = true;
    }

  }

  /**
     * User selects the ancestry "human"
     */
  humanClick() {
    this.resetRaces();
    if (this.humanSelected == false) {

      this.race = "human";

      this.humanSelected = true;
    }
  }

  /**
   * Ancestry selection is reset before reassignment
   */
  resetRaces() {

    this.elfSelected = false;
    this.dwarfSelected = false;
    this.humanSelected = false;
  }




  //Birthplace

  /**
   * Forest was chosen as the place of birth
   */
  forestClick() {
    this.resetBirthplaces();
    if (this.forestSelected == false) {
      this.birthplace = "forest";
      this.forestSelected = true;
      this.birthplaceSelected = true;
    }


  }

  /**
    * Mountain was chosen as the place of birth
    */
  mountainClick() {
    this.resetBirthplaces();
    if (this.mountainSelected == false) {
      this.birthplace = "mountain";
      this.mountainSelected = true;
      this.birthplaceSelected = true;
    }

  }



  /**
    * Birthplace selection is reset before reassignment
    */
  resetBirthplaces() {
    this.forestSelected = false;
    this.mountainSelected = false;
  }


  /**
   * Navigate to the page "class" 
   */
  nextPageButton() {
    this.navParamService.setRace(this.race);
    this.navParamService.setPlace(this.birthplace);
    this.router.navigate(['class']);
  }

  /**
   * Navigate to previous page (pronoun)
   */
  backButton() {
    this.router.navigate(['pronoun']);
  }



}
