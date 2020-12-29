import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Chat } from 'models/chats';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  submit() {
    const messageValue: string = this.chatForm.get('message')?.value;
    if (messageValue.startsWith('Server:')) {
      this.chatHistory.push({
        isMine: false,
        message: messageValue.slice(7),
      });
    } else {
      this.chatHistory.push({
        isMine: true,
        message: messageValue,
      });
    }
    this.chatForm.setValue({ message: null });
  }
}
