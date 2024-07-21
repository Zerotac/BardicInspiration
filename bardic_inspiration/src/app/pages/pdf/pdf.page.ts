import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';

import { NavparamService } from '../../../services/navparam.service';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

import {ProgressbarComponent} from '../../components/progressbar/progressbar.component';
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.page.html',
  styleUrls: ['./pdf.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton,ProgressbarComponent]
})
export class PdfPage implements OnInit {
  charImageUrl: string = "";
  story: string = "";
  header: string = "";
  imageData: string | ArrayBuffer | null = null;

  progressElements: boolean[] = [true, true, true, true, true, true, true, true, true];

  constructor(private router: Router,
    private navParamService: NavparamService,) { }

  ngOnInit() {
    this.navParamService.setProgressBar(this.progressElements);
    //get some data from previous pages
    this.charImageUrl = this.navParamService.getImage();
    this.story = this.navParamService.getStory();
    var name = this.navParamService.getCharName();
    this.header = "The Background Story of " + name;
  }

  /**
   * format story as PDF 
   */
  downloadPDF() {

    const doc = new jsPDF();


    doc.setFontSize(18);
    doc.setFont('times new roman', 'bold');
    doc.text(this.header, 60, 20);


    doc.setFontSize(12); // Set the font size to 12
    doc.setFont('times new roman', 'normal'); // Set the font to Helvetica normal
    const text = doc.splitTextToSize(this.story, 180);
    doc.text(text, 10, 30);
    doc.save('backgroundStory.pdf');
  }



}


