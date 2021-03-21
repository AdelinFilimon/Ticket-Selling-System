package com.gmail.filimon24.adelin.ticketsellingsystem.business.service;

import com.gmail.filimon24.adelin.ticketsellingsystem.business.exception.TicketNotFoundException;
import com.gmail.filimon24.adelin.ticketsellingsystem.model.Show;
import com.gmail.filimon24.adelin.ticketsellingsystem.model.Ticket;
import com.gmail.filimon24.adelin.ticketsellingsystem.persistence.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public Ticket addTicket(Ticket ticket) {
        if (ticket.getId() != null)
            throw new IllegalArgumentException("Expected ticket ID null");
        return ticketRepository.save(ticket);
    }

    public Ticket updateTicket(Long id, Ticket ticket) {

        Ticket dbTicket = getTicketById(id);
        Show show;
        int nrOfPlaces;

        show = ticket.getShow();
        if (show != null) dbTicket.setShow(show);

        nrOfPlaces = ticket.getNrOfPlaces();
        if (nrOfPlaces != dbTicket.getNrOfPlaces()) dbTicket.setNrOfPlaces(nrOfPlaces);
        return ticketRepository.save(dbTicket);
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new TicketNotFoundException(id));
    }

    public void deleteTicketById(Long id) {
        Ticket ticket = getTicketById(id);
        ticketRepository.delete(ticket);
    }
}
