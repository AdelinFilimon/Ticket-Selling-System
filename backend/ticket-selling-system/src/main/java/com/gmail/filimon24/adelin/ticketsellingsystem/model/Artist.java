package com.gmail.filimon24.adelin.ticketsellingsystem.model;

import org.json.JSONObject;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "artists", schema = "ticket-selling-system-db")
public class Artist implements JsonConvertible{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "dj_name")
    private String djName;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String email;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "artist")
    private List<Show> shows;

    public Artist() {}

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Show> getShows() {
        return shows;
    }

    public String getDjName() {
        return djName;
    }

    public void setDjName(String djName) {
        this.djName = djName;
    }

    @Override
    public String toString() {
        return convertToJson().toString();
    }

    @Override
    public JSONObject convertToJson() {
        JSONObject json = new JSONObject();
        json.put("id", id);
        json.put("djName", djName);
        json.put("first_name", firstName);
        json.put("last_name", lastName);
        json.put("email", email);
        return json;
    }

}
