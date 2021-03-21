package com.gmail.filimon24.adelin.ticketsellingsystem.model;

import org.json.JSONObject;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "genres", schema = "ticket-selling-system-db")
public class Genre implements JsonConvertible {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String genre;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "genre")
    private List<Show> shows;

    public Genre() {}

    public Long getId() {
        return id;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public List<Show> getShows() {
        return shows;
    }

    @Override
    public String toString() {
        return convertToJson().toString();
    }

    @Override
    public JSONObject convertToJson() {
        JSONObject json = new JSONObject();
        json.put("id", id);
        json.put("genre", genre);
        return json;
    }

}
