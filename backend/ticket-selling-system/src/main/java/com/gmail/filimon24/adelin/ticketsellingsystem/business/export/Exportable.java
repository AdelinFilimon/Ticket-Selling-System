package com.gmail.filimon24.adelin.ticketsellingsystem.business.export;

import com.gmail.filimon24.adelin.ticketsellingsystem.model.Ticket;

import java.util.List;

public interface Exportable {
    String exportStringFromSoldTickets(List<Ticket> tickets);
    String getFileExtension();
}
