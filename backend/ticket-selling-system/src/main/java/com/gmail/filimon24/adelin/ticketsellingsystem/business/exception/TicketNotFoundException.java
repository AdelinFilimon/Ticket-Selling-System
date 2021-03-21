package com.gmail.filimon24.adelin.ticketsellingsystem.business.exception;

public class TicketNotFoundException extends RuntimeException {
    public TicketNotFoundException(Long id) {
        super("Could not find ticket with id " + id);
    }
}
