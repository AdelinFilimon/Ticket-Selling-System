package com.gmail.filimon24.adelin.ticketsellingsystem.presentation;

import com.gmail.filimon24.adelin.ticketsellingsystem.business.export.ExportFactory;
import com.gmail.filimon24.adelin.ticketsellingsystem.business.export.ExportType;
import com.gmail.filimon24.adelin.ticketsellingsystem.business.export.Exportable;
import com.gmail.filimon24.adelin.ticketsellingsystem.business.service.ShowService;
import com.gmail.filimon24.adelin.ticketsellingsystem.model.Show;
import com.gmail.filimon24.adelin.ticketsellingsystem.model.Ticket;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.NotSupportedException;
import java.util.List;

@RestController
public class ShowController {

    private final ShowService showService;

    public ShowController(ShowService showService) {
        this.showService = showService;
    }

    @PostMapping("/shows/add")
    public ResponseEntity<String> addShow(@RequestBody Show show) {
        try {
            Show insertedShow = showService.addShow(show);
            return new ResponseEntity<>(insertedShow.toString(), HttpStatus.OK);
        } catch (Exception exception) {
            return ApiResponseUtil.generateMessageResponse(exception.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/shows")
    public ResponseEntity<String> getAllShows() {
        try {
            return ApiResponseUtil.generateJsonArrayResponse(showService.getAllShows(), HttpStatus.OK);
        } catch (Exception exception) {
            return ApiResponseUtil.generateMessageResponse(exception.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/shows/{id}")
    public ResponseEntity<String> getShowById(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(showService.getShowById(id).toString(), HttpStatus.OK);
        } catch (Exception exception) {
            return ApiResponseUtil.generateMessageResponse(exception.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/shows/{id}")
    public ResponseEntity<String> updateShow(@RequestBody Show show, @PathVariable Long id) {
        try {
            Show updatedShow = showService.updateShow(id, show);
            return new ResponseEntity<>(updatedShow.toString(), HttpStatus.OK);
        } catch (Exception exception) {
            return ApiResponseUtil.generateMessageResponse(exception.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/shows/{id}")
    public ResponseEntity<String> deleteShow(@PathVariable Long id) {
        try {
            showService.deleteShowById(id);
            return ApiResponseUtil.generateMessageResponse("Show with id " + id + " was deleted.", HttpStatus.OK);
        } catch (Exception exception) {
            return ApiResponseUtil.generateMessageResponse(exception.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/shows/{id}/tickets")
    public ResponseEntity<String> getSoldTickets(@PathVariable Long id) {
        try {
            return ApiResponseUtil.generateJsonArrayResponse(showService.getSoldTicketsAtShowById(id), HttpStatus.OK);
        } catch (Exception exception) {
            return ApiResponseUtil.generateMessageResponse(exception.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/shows/{id}/download_tickets")
    public HttpEntity<byte[]> downloadSoldTickets(@PathVariable Long id) throws NotSupportedException {
        List<Ticket> tickets = showService.getSoldTicketsAtShowById(id);
        Exportable exportable = ExportFactory.getExportableSoldTickets(ExportType.JSON);
        String json = exportable.exportStringFromSoldTickets(tickets);
        String filename = "soldTickets" + id + exportable.getFileExtension();
        byte[] body = json.getBytes();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", filename));
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        return new HttpEntity<>(body, headers);
    }

}
