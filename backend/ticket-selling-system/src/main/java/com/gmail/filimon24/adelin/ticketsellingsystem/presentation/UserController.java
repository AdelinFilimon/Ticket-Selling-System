package com.gmail.filimon24.adelin.ticketsellingsystem.presentation;

import com.gmail.filimon24.adelin.ticketsellingsystem.business.service.UserService;
import com.gmail.filimon24.adelin.ticketsellingsystem.model.User;
import com.gmail.filimon24.adelin.ticketsellingsystem.persistence.ArtistRepository;
import com.gmail.filimon24.adelin.ticketsellingsystem.persistence.GenreRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final ArtistRepository artistRepository;
    private final GenreRepository genreRepository;

    public UserController(UserService userService, ArtistRepository artistRepository, GenreRepository genreRepository) {
        this.userService = userService;
        this.artistRepository = artistRepository;
        this.genreRepository = genreRepository;
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

    @PostMapping("/auth")
    public ResponseEntity<String> authenticate(@RequestBody LoginForm loginForm) {
        try {
            User user = userService.getUserByUsername(loginForm.getUsername());
            if (userService.checkPassword(loginForm.getPassword(), user))
                return new ResponseEntity<>(user.toString(), HttpStatus.OK);
            else
                return ApiResponseUtil.generateMessageResponse("Bad credentials", HttpStatus.UNAUTHORIZED);
        } catch (Exception exception) {
            return ApiResponseUtil.generateMessageResponse("User not found", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/artists")
    public ResponseEntity<String> getAllShows() {
        try {
            return ApiResponseUtil.generateJsonArrayResponse(artistRepository.findAll(), HttpStatus.OK);
        } catch (Exception exception) {
            return ApiResponseUtil.generateMessageResponse(exception.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/genres")
    public ResponseEntity<String> getAllGenres() {
        try {
            return ApiResponseUtil.generateJsonArrayResponse(genreRepository.findAll(), HttpStatus.OK);
        } catch (Exception exception) {
            return ApiResponseUtil.generateMessageResponse(exception.toString(), HttpStatus.BAD_REQUEST);
        }
    }

}
