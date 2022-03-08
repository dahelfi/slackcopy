import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Conversation } from 'src/models/conversations.class';
import { Message } from 'src/models/message.class';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  public Editor = ClassicEditor;
  messageJson = {
    creatorId: 0,
    messageContent: "",
    timestamp: '',
    creatorUserName: '',

  };
  messageObject!: Message;
  conversationObject!: Conversation;
  showAllConversation: string[] = [];
  flag = false;


  public config = {
    placeholder: 'Type the content here!'
  }

  fillerContent = Array.from(
    { length: 8 },
    () =>
      `Lorem`,
  );

  constructor(public backend: BackendServiceService) { }

  ngOnInit(): void {
  }



  public manageMessageSending() {
    if (this.messageJson.messageContent !== null) {
      this.messageJson.timestamp = new Date().getTime().toString();
      this.messageJson.creatorId = this.backend.loggedInUser.userId;
      this.messageJson.creatorUserName = this.backend.loggedInUser.userName;
      this.messageObject = new Message(this.messageJson);
      this.backend.actualConversation.messages.push(this.messageObject.toJson());
      this.messageJson.messageContent = '';

      this.backend.updateElementInDatabase("conversations", this.backend.actualConversation.toJson(), this.backend.actualConversation.customIdName);
    }
  }



  /**
   * mit dieser methode kann man weitere nachrichten schicken wenn die erste bereits geschickt ist und das element bereits kreeiert ist


  /**
   * updates an exicting conversationselement when one message is added
   * @param conversationElement 
   */
  // public updateConversation(conversationElement:any){
  //   for (let i = 0; i < this.backend.allConversationsForDb.allConversationsArray.length; i++) {
  //      if(this.backend.allConversationsForDb.allConversationsArray[i].conversationId == conversationElement.conversationId){
  //       this.backend.allConversationsForDb.allConversationsArray[i] = conversationElement;
  //      }

  //     }
  //   this.backend.updateAllConversations();

  // }

}
