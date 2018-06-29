package com.ippon.dojo.web.websocket.dto;

import org.apache.commons.lang3.builder.ToStringBuilder;

import java.time.Instant;

public class RoomActivityDTO {

    private String sessionId;
    private RoomActivityAction roomActivityAction;
    private String userLogin;
    private String ipAddress;
    private String page;
    private Instant time;

    public RoomActivityDTO() {
        //default
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public RoomActivityAction getRoomActivityAction() {
        return roomActivityAction;
    }

    public void setRoomActivityAction(RoomActivityAction roomActivityAction) {
        this.roomActivityAction = roomActivityAction;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getPage() {
        return page;
    }

    public void setPage(String page) {
        this.page = page;
    }

    public Instant getTime() {
        return time;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this)
            .append("sessionId", sessionId)
            .append("roomActivityAction", roomActivityAction)
            .append("userLogin", userLogin)
            .append("ipAddress", ipAddress)
            .append("page", page)
            .append("time", time)
            .toString();
    }
}
