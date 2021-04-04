package com.gmail.filimon24.adelin.ticketsellingsystem.business.service;

import com.gmail.filimon24.adelin.ticketsellingsystem.business.exception.ShowNotFoundException;
import com.gmail.filimon24.adelin.ticketsellingsystem.model.Artist;
import com.gmail.filimon24.adelin.ticketsellingsystem.model.Genre;
import com.gmail.filimon24.adelin.ticketsellingsystem.model.Show;
import com.gmail.filimon24.adelin.ticketsellingsystem.model.Ticket;
import com.gmail.filimon24.adelin.ticketsellingsystem.persistence.ShowRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ShowService {

    private final ShowRepository showRepository;

    public ShowService(ShowRepository showRepository) {
        this.showRepository = showRepository;
    }

    public Show addShow(Show show) {
        if (show.getId() != null)
            throw new IllegalArgumentException("Expected show ID null");

        Show savedShow = showRepository.save(show);
        return getShowById(savedShow.getId());
    }

    public Show updateShow(Long id, Show show) {

        Show dbShow = getShowById(id);
        Genre genre;
        Artist artist;
        String title;
        int nr_of_tickets;
        Date date;

        genre = show.getGenre();
        if (genre != null) dbShow.setGenre(genre);

        artist = show.getArtist();
        if (artist != null) dbShow.setArtist(artist);

        date = show.getDate();
        if (date != null) dbShow.setDate(date);

        title = show.getTitle();
        if (title != null) dbShow.setTitle(title);

        nr_of_tickets = show.getNrOfTickets();
        if (nr_of_tickets != dbShow.getNrOfTickets()) dbShow.setNrOfTickets(nr_of_tickets);

        showRepository.save(dbShow);
        return getShowById(dbShow.getId());
    }

    public List<Show> getAllShows() {
        return showRepository.findAll();
    }

    public Show getShowById(Long id) {
        return showRepository.findById(id)
                .orElseThrow(() -> new ShowNotFoundException(id));
    }

    public void deleteShowById(Long id) {
        Show show = getShowById(id);
        showRepository.delete(show);
    }

    public List<Ticket> getSoldTicketsAtShowById(Long id) {
        Show show = getShowById(id);
        return show.getTickets();
    }

}
