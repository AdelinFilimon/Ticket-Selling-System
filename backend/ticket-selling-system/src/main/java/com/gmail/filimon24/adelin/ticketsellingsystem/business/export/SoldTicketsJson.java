package com.gmail.filimon24.adelin.ticketsellingsystem.business.export;

import com.gmail.filimon24.adelin.ticketsellingsystem.model.Ticket;
import org.json.JSONArray;

import java.util.List;

public class SoldTicketsJson implements Exportable{

    @Override
    public String exportStringFromSoldTickets(List<Ticket> tickets) {
        JSONArray array = new JSONArray();
        for(Ticket ticket : tickets)
            array.put(ticket.convertToJson());
        return array.toString(4);
    }

    @Override
    public String getFileExtension() {
        return ".json";
    }
}
