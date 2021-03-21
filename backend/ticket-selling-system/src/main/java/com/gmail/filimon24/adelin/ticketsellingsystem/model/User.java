package com.gmail.filimon24.adelin.ticketsellingsystem.model;

import org.json.JSONObject;

import javax.persistence.*;

@Entity
@Table(name = "users", schema = "ticket-selling-system-db")
public class User implements JsonConvertible{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "username")
    private String userName;

    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String email;

    private Role role;

    public User() { }

    public Long getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return convertToJson().toString();
    }

    @Override
    public JSONObject convertToJson() {
        JSONObject json = new JSONObject();
        json.put("id", id);
        json.put("username", userName);
        json.put("password", password);
        json.put("first_name", firstName);
        json.put("last_name", lastName);
        json.put("email", email);
        json.put("role", role.getCode());
        return json;
    }

}
