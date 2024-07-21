import { Injectable } from '@angular/core';
import axios from 'axios';

/**
 * Service. Sends request ro the ChatGPT API
 */
@Injectable({
  providedIn: 'root'
})
export class ChatgptService {


  private story: string = "";
  private apiKey: string = 'API_KEY_HERE';  // Replace with your actual API key
  private apiUrl: string = 'https://api.openai.com/v1/chat/completions';

  //to remember the conversation with the API
  private conversationHistory: { role: string, content: string }[];
  constructor() { this.conversationHistory = [{ role: 'system', content: 'You are a helpful assistant.' }]; }


  /**
   * Makes request to the API.
   * Remembers the conversation to ensure that it wont generate a completely new story.
   * @param prompt instruction for the ptrompt
   * @returns story
   */
  async getChatResponse(prompt: string): Promise<any> {
    console.log("Calling ChatGPT");
    this.conversationHistory.push({ role: 'user', content: prompt });
    try {
      const response = await axios.post(this.apiUrl, {
        model: 'gpt-4', // Ensure to specify only the model
        messages: this.conversationHistory
        //[{ role: 'user', content: prompt }]
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      // Get the assistant's response
      const assistantMessage = response.data.choices[0].message;

      // Add the assistant's response to the conversation history
      this.conversationHistory.push(assistantMessage);

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Handle errors from Axios
        console.error('Axios error:', error.response?.data);
        throw new Error(error.response?.data || 'Unknown Axios error');
      } else {
        // Handle generic errors
        console.error('Generic error:', error);
        throw new Error('An unknown error occurred');
      }
    }
  }


}
