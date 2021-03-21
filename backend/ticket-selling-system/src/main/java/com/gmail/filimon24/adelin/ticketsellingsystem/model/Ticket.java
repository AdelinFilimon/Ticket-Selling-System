package com.gmail.filimon24.adelin.ticketsellingsystem.model;

import org.json.JSONObject;

import javax.persistence.*;

@Entity
@Table(name = "tickets", schema = "ticket-selling-system-db")
public class Ticket implements JsonConvertible {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "show_id")
    private Show show;

    @Column(name = "nr_of_places")
    private Integer nrOfPlaces;

    public Ticket() {}

    public Long getId() {
        return id;
    }

    public Show getShow() {
        return show;
    }

    public void setShow(Show show) {
        this.show = show;
    }

    public int getNrOfPlaces() {
        return nrOfPlaces;
    }

    public void setNrOfPlaces(int nrOfPlaces) {
        this.nrOfPlaces = nrOfPlaces;
    }

    @Override
    public String toString() {
        return convertToJson().toString();
    }

    @Override
    public JSONObject convertToJson() {
        JSONObject json = new JSONObject();
        json.put("id", id);
        json.put("show", show.getTitle());
        json.put("nr_of_places", nrOfPlaces);
        return json;
    }
}
