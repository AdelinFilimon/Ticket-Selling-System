package com.gmail.filimon24.adelin.ticketsellingsystem.business.export;

import com.gmail.filimon24.adelin.ticketsellingsystem.model.Ticket;

import java.util.List;

public class SoldTicketsCsv implements Exportable{
    @Override
    public String exportStringFromSoldTickets(List<Ticket> tickets) {
        return null;
    }

    @Override
    public String getFileExtension() {return ".csv";}
}
