package com.gmail.filimon24.adelin.ticketsellingsystem.persistence;

import com.gmail.filimon24.adelin.ticketsellingsystem.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
