package com.gmail.filimon24.adelin.ticketsellingsystem.presentation;

import com.gmail.filimon24.adelin.ticketsellingsystem.business.service.TicketService;
import com.gmail.filimon24.adelin.ticketsellingsystem.model.Ticket;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/tickets/add")
    public ResponseEntity<String> addTicket(@RequestBody Ticket ticket) {
        try {
            Ticket insertedTicket = ticketService.addTicket(ticket);
            return new ResponseEntity<>(insertedTicket.toString(), HttpStatus.OK);
        } catch (Exception exception) {
            return ApiResponseUtil.generateMessageResponse(exception.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/tickets")
    public ResponseEntity<String> getAllTickets() {
        try {
            return ApiResponseUtil.generateJsonArrayResponse(ticketService.getAllTickets(), HttpStatus.OK);
        } catch (Exception exception) {
            return ApiResponseUtil.generateMessageResponse(exception.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/tickets/{id}")
    public ResponseEntity<String> getTicketById(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(ticketService.getTicketById(id).toString(), HttpStatus.OK);
        } catch (Exception exception) {
            return ApiResponseUtil.generateMessageResponse(exception.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/tickets/{id}")
    public ResponseEntity<String> updateTicket(@RequestBody Ticket ticket, @PathVariable Long id) {
        try {
            Ticket updatedTicket = ticketService.updateTicket(id, ticket);
            return new ResponseEntity<>(updatedTicket.toString(), HttpStatus.OK);
        } catch (Exception exception) {
            return ApiResponseUtil.generateMessageResponse(exception.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/tickets/{id}")
    public ResponseEntity<String> deleteShow(@PathVariable Long id) {
        try {
            ticketService.deleteTicketById(id);
            return ApiResponseUtil.generateMessageResponse("Ticket with id " + id + " was deleted.", HttpStatus.OK);
        } catch (Exception exception) {
            return ApiResponseUtil.generateMessageResponse(exception.toString(), HttpStatus.BAD_REQUEST);
        }
    }

}
