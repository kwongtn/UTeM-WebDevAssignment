import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChatForm, ChatResponse } from 'models/apiTypes';

import { Chat } from 'models/chats';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
})
export class ChatboxComponent implements OnInit {
  chatHistory: Array<Chat> = [
    {
      isMine: false,
      message: 'Hi there! How can I help you?',
    },
  ];
  chatForm = this.fb.group({
    message: [null],
  });

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {}

  submit() {
    const messageValue: string = this.chatForm.get('message')?.value;

    const chatForm: ChatForm = {
      sessionID: localStorage.getItem('sessionID')
        ? localStorage.getItem('sessionID')
        : null,
      message: messageValue,
    };

    this.chatHistory.push({
      isMine: true,
      message: messageValue,
    });
    this.chatForm.setValue({ message: null });

    this.sessionService.chat(chatForm).subscribe((res: ChatResponse) => {
      this.chatHistory.push({
        isMine: false,
        message: res.message,
      });
    });
  }
}
