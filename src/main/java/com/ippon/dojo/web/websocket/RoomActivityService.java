package com.ippon.dojo.web.websocket;

import static com.ippon.dojo.config.WebsocketConfiguration.IP_ADDRESS;

import com.ippon.dojo.web.websocket.dto.ActivityDTO;

import java.security.Principal;
import java.time.Instant;

import com.ippon.dojo.web.websocket.dto.RoomActivityAction;
import com.ippon.dojo.web.websocket.dto.RoomActivityDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Controller
public class RoomActivityService implements ApplicationListener<SessionDisconnectEvent> {

    private static final Logger log = LoggerFactory.getLogger(ActivityService.class);
    private static final String MESSAGE_MAPPING_ENDPOINT = "/topic/room-activity";
    private static final String MESSAGE_SEND_TO_ENDPOINT = "/topic/room-tracker";


    private final SimpMessageSendingOperations messagingTemplate;

    public RoomActivityService(SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping(MESSAGE_MAPPING_ENDPOINT)
    @SendTo(MESSAGE_SEND_TO_ENDPOINT)
    public RoomActivityDTO sendUpdate(@Payload RoomActivityDTO activityDTO, StompHeaderAccessor stompHeaderAccessor, Principal principal) {
        activityDTO.setUserLogin(principal.getName());
        activityDTO.setSessionId(stompHeaderAccessor.getSessionId());
        activityDTO.setIpAddress(stompHeaderAccessor.getSessionAttributes().get(IP_ADDRESS).toString());
        activityDTO.setTime(Instant.now());
        log.debug("Sending room tracking data {}", activityDTO);
        return activityDTO;
    }

    @Override
    public void onApplicationEvent(SessionDisconnectEvent event) {
        RoomActivityDTO activityDTO = new RoomActivityDTO();
        activityDTO.setSessionId(event.getSessionId());
        activityDTO.setRoomActivityAction(RoomActivityAction.LEAVE);
        messagingTemplate.convertAndSend(MESSAGE_SEND_TO_ENDPOINT, activityDTO);
    }
}
