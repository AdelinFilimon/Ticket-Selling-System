package com.gmail.filimon24.adelin.ticketsellingsystem.presentation;

import com.gmail.filimon24.adelin.ticketsellingsystem.model.JsonConvertible;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collection;

public class ApiResponseUtil {

    public static ResponseEntity<String> generateMessageResponse(String message, HttpStatus status) {
        JSONObject response = new JSONObject();
        response.put("message", message);
        return new ResponseEntity<>(response.toString(), status);
    }

    public static ResponseEntity<String> generateJsonArrayResponse(Collection<? extends JsonConvertible> objects, HttpStatus status) {
        JSONArray response = new JSONArray();
        for(JsonConvertible object : objects) {
            response.put(object.convertToJson());
        }
        return new ResponseEntity<>(response.toString(), status);
    }

}
