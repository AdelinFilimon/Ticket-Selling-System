package com.gmail.filimon24.adelin.ticketsellingsystem.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.json.JSONObject;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "shows", schema = "ticket-selling-system-db")
public class Show implements JsonConvertible {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "genre_id")
    private Genre genre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artist_id")
    private Artist artist;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "show")
    private List<Ticket> tickets;

    private String title;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date")
    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm")
    private Date date;

    @Column(name = "nr_of_tickets")
    private Integer nrOfTickets;

    public Show() {}

    public Long getId() {
        return id;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public Artist getArtist() {
        return artist;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getNrOfTickets() {
        return nrOfTickets;
    }

    public void setNrOfTickets(int nrOfTickets) {
        this.nrOfTickets = nrOfTickets;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    @Override
    public String toString() {
        return convertToJson().toString();
    }

    @Override
    public JSONObject convertToJson() {
        JSONObject json = new JSONObject();
        json.put("id", id);
        json.put("genre", genre.getGenre());
        json.put("artist", artist.getDjName());
        json.put("date", date.toString());
        json.put("title", title);
        json.put("nr_of_tickets", nrOfTickets);
        return json;
    }

}
