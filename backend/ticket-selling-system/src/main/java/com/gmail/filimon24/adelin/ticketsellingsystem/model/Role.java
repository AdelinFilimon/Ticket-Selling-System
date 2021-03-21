package com.gmail.filimon24.adelin.ticketsellingsystem.model;

public enum Role {
    CASHIER("cashier"), ADMINISTRATOR("administrator");

    private final String code;

    Role(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

}
