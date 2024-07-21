import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTextarea, IonButton, IonInput, IonItem, IonLabel } from '@ionic/angular/standalone';


import { NavparamService } from '../../../services/navparam.service';
import { JsonHelperService } from '../../services/json-helper.service';
import { Router } from '@angular/router';
import { ChatgptService } from '../../services/chatgpt.service';
import { Tropes } from '../../models';

import { Subscription } from 'rxjs';

import {ProgressbarComponent} from '../../components/progressbar/progressbar.component';
/**
 * Page for story generation 
 */
@Component({
  selector: 'app-story',
  templateUrl: './story.page.html',
  styleUrls: ['./story.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle,ProgressbarComponent, IonToolbar, CommonModule, FormsModule, IonTextarea, IonButton, IonInput, IonItem, IonLabel]
})
export class StoryPage implements OnInit {


  //response from chatGPT
  chatResponse: string = "";

  responsesArray: string[] = [];

  //prompt instruction 
  chatInput: string = "Create a short Story for a dnd character.";

  charImageUrl: string = "";

  //currently selected text & marked text
  selectedText: string = '';
  textToChange: string[] = [];
  textToKeep: string[] = [];
  coloredTexts: { text: string, color: string }[] = [];

  //Tag List
  name: string = "";
  pronouns: string = "";
  textPronoun: string = "";
  class: string = "";
  classPrompt: string = "";
  race: string = "";
  subclass: string = "";
  subclassPrompt: string = "";
  birthplace: string = "";
  currTrope: Tropes | null = null;
  trope: string = "";


  changeSelected: boolean = false;
  changeInputText: string = "";


  showLoadingScreen: boolean = true;

  private dataSubscription: Subscription | null = null;;
  funfact: string = "";

  progressElements: boolean[] = [true, true, true, true, true, true, true, true, false];
  constructor(private router: Router,
    private navParamService: NavparamService,
    private jsonHelperService: JsonHelperService,
    private chatgptService: ChatgptService,
  ) { }

  ngOnInit() {
    this.navParamService.setProgressBar(this.progressElements);
    //get all the data the user selected in the previous pages
    this.name = this.navParamService.getCharName();
    this.pronouns = this.navParamService.getPronouns();
    switch (this.pronouns) {
      case "he/him":
        this.textPronoun = "his";
        break;
      case "she/her":
        this.textPronoun = "her";
        break;
      case "they/them":
        this.textPronoun = "their";
        break;
      default:
        break;
    }

    this.class = this.navParamService.getClass();
    this.classPrompt = this.navParamService.getClassPrompt();
    this.race = this.navParamService.getRace();
    this.subclass = this.navParamService.getSubClass();
    this.subclassPrompt = this.navParamService.getSubClassPrompt();
    this.birthplace = this.navParamService.getPlace();
    this.currTrope = this.navParamService.getTrope();
    if (this.currTrope) { this.trope = this.currTrope?.name; }
    this.charImageUrl = this.navParamService.getImage();

    //Prompt instruction for ChatGPT API  
    this.chatInput = "Create a background story for a dnd character. His name is " + this.name + ", his Pronouns are " + this.pronouns +
      " . He was born in the" + this.birthplace + " and has the race " + this.race + " . His class is " + this.class + ", which can be described as follows. " + this.classPrompt +
      " The sublcass of the character is " + this.subclass + ", which can be described as follows. " + this.subclassPrompt +
      "Use the trope " + this.currTrope?.name + ", which can be described as follows." + this.currTrope?.prompt
      + " . Make sure to include a compelling cause or mission for this character based on the generated backstory that draws them to the life of an adventurer";

    //display funfacts in the UI
    this.funfact = this.navParamService.getFirstFunfactData();
    this.displayFunfacts();

    //Call Chat GPT API
    this.getResponse(this.chatInput);
    //this.chatResponse = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";


    this.responsesArray.push(this.chatResponse);

  }

  /**
   * Calls the chatgptService to make a call to the API
   * @param chatInput prompt instruction 
   */
  async getResponse(chatInput: string) {
    try {
      const response = await this.chatgptService.getChatResponse(chatInput);
      this.chatResponse = response.choices[0].message.content;
      this.showLoadingScreen = false;
      this.unsubscribeFacts();
    } catch (error) {
      this.chatResponse = 'Error: Unable to fetch response.';
    }
  }

  /**
   * Marks the selected text with color
   * @param color orange or lightskyblue 
   * @param selectedText the selected text by the user 
   */
  addColoredText(color: string, selectedText: string) {
    switch (color) {
      case 'lightskyblue':
        this.coloredTexts.push({ text: selectedText, color: 'lightskyblue' });
        break;
      case 'orange':
        this.coloredTexts.push({ text: selectedText, color: 'orange' });
        break;
      default:
        break;
    }
  }

  //Get the selected Text from the div
  captureSelectedText(event: MouseEvent) {
    const selection = window.getSelection();
    if (selection) {
      this.selectedText = selection.toString();
    }
  }

  /**
   * Get selected Text and mark it & add it to the Tag-Box
   */
  markText(markType: string) {
    const selection = window.getSelection();
    var color = "";
    var classType = "";

    if (markType == "keep") { color = 'lightskyblue'; classType = "highlighted-keeptext"; }
    if (markType == "change") { color = 'orange'; classType = "'highlighted-changetext'"; }


    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.backgroundColor = color; //highlight color
      span.classList.add('highlighted-keeptext');
      range.surroundContents(span);

      //add text to tag-frame
      if (markType == "keep") {
        this.textToKeep.push(selection.toString());
        this.addColoredText(color, selection.toString());
      }
      if (markType == "change") {
        this.changeSelected = true;
      }

      //Clear the selection after highlighting
      selection.removeAllRanges();
    }
  }

  /**
   * If a new text is generated remove all the <span> elements
   */
  removeHighlight() {
    // Select all span elements with the class 'highlighted-keeptext'
    const highlightedElements = document.querySelectorAll('span.highlighted-keeptext');

    // Iterate through each selected element and remove it
    highlightedElements.forEach(span => {
      if (span.parentNode) {
        span.parentNode.removeChild(span);
      }

    });

    //delete text from paragraph that displays the story
    const paragraph = document.getElementById('responseParagraph');
    if (paragraph) { paragraph.textContent = ''; }

  }


  /**
   * adds changes that the user wants to an array.
   */
  enterChanges() {
    const color = 'orange';
    this.addColoredText(color, this.changeInputText);
    //format text for the prompt
    this.textToChange.push("Change " + this.selectedText + " to " + this.changeInputText + ". ");
    this.changeSelected = false;
    this.changeInputText = "";

  }

  /**
   * Navigate to the last page (pdf)
   */
  nextPageButton() {

    this.navParamService.setStory(this.chatResponse);
    this.router.navigate(['pdf']);
  }

  /**
   * Clear the <p> element form all elements.
   * Get the text that the user wants to keep or change from the arrays & format it for the prompt.
   * 
   */
  newStory() {
    this.removeHighlight();
    this.showLoadingScreen = true;
    this.displayFunfacts();
    this.responsesArray = [];
    var changes = "";
    this.chatResponse = "";
    var keep = "";
    //get changes that the user wants
    if (this.textToChange.length == 0) { changes = "Change nothing on the story. " }
    else {
      for (const elements of this.textToChange) {
        changes += elements;
      }
    }
    //get text that the user wants to keep
    if (this.textToKeep.length == 0) { keep = "keep everything except the changes. " + changes; }
    else {
      for (const elements of this.textToKeep) {
        keep += (elements + " ,");
      }

    }
    //format the changes and the text to keep for the prompt
    this.chatInput = "Change the following passages on the text. " + changes + " And make sure to keep the following parts of the story : " + keep;


    this.coloredTexts = [];
    //send request to the API & get new story
    this.getResponse(this.chatInput);
    this.responsesArray.push(this.chatResponse);
  }

  /**
   * navigate to the previous page (tropes)
   */
  backButton() {

    this.router.navigate(['tropes']);
  }

  /**
   * display funfacts in the UI
   */
  displayFunfacts() {
    this.dataSubscription = this.navParamService.getFunfactDataStream().subscribe(data => {
      this.funfact = data;
    });
  }
  /**
   * Stop displaying funfacts in the UI (unsubscribe to the datastream)
   */
  unsubscribeFacts() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  /**
   * when user leaves the page unsubscribe to the datastream
   */
  ngOnDestroy() {
    this.unsubscribeFacts();
  }

}
