package com.example.chatApp.controller;

import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api")
public class MessageController {

    @MessageMapping("/message")

    @SendTo("/to/return")
    public Message getContent(@RequestBody Message message){
//        try {
//            Thread.sleep(2000);
//
//        }
//        catch (InterruptedException e){
//            e.printStackTrace();
//        }
        return message;
    }
}
