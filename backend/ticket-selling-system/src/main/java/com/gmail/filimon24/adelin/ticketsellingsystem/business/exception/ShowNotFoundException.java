package com.gmail.filimon24.adelin.ticketsellingsystem.business.exception;

public class ShowNotFoundException extends RuntimeException {

    public ShowNotFoundException (Long id) {
        super("Could not find show " + id);
    }
}
