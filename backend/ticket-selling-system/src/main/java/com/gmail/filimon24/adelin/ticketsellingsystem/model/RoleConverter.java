package com.gmail.filimon24.adelin.ticketsellingsystem.model;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply = true)
public class RoleConverter implements AttributeConverter<Role, String> {

    @Override
    public String convertToDatabaseColumn(Role role) {
        if (role == null) return null;

        return role.getCode();
    }

    @Override
    public Role convertToEntityAttribute(String s) {
        if (s == null) return null;

        return Stream.of(Role.values())
                .filter(c -> c.getCode().equals(s))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
