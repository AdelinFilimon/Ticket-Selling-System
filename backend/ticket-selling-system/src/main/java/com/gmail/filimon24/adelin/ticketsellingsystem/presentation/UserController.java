package com.gmail.filimon24.adelin.ticketsellingsystem.presentation;

import com.gmail.filimon24.adelin.ticketsellingsystem.business.service.UserService;
import com.gmail.filimon24.adelin.ticketsellingsystem.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping ("/cashiers/add")
    public ResponseEntity<String> addCashier(@RequestBody User user) {
        try {
            User insertedUser = userService.addCashier(user);
            return new ResponseEntity<>(insertedUser.toString(), HttpStatus.OK);
        } catch (Exception exception) {
            return ApiResponseUtil.generateMessageResponse(exception.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/cashiers")
    public ResponseEntity<String> getAllCashiers() {
        try {
            return ApiResponseUtil.generateJsonArrayResponse(userService.getAllCashiers(), HttpStatus.OK);
        } catch (Exception exception) {
            return ApiResponseUtil.generateMessageResponse(exception.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/cashiers/{id}")
    public ResponseEntity<String> getCashierById(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(userService.getCashierById(id).toString(), HttpStatus.OK);
        } catch (Exception exception) {
            return ApiResponseUtil.generateMessageResponse(exception.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/cashiers/{id}")
    public ResponseEntity<String> updateCashier(@PathVariable Long id, @RequestBody User user) {
        try {
            User updatedUser = userService.updateCashier(id, user);
            return new ResponseEntity<>(updatedUser.toString(), HttpStatus.OK);
        } catch (Exception exception) {
            return ApiResponseUtil.generateMessageResponse(exception.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/cashiers/{id}")
    public ResponseEntity<String> deleteCashier(@PathVariable Long id) {
        try {
            userService.deleteCashierById(id);
            return ApiResponseUtil.generateMessageResponse("Cashier with id " + id + " was deleted.", HttpStatus.OK);
        } catch (Exception exception) {
            return ApiResponseUtil.generateMessageResponse(exception.toString(), HttpStatus.BAD_REQUEST);
        }
    }
}
