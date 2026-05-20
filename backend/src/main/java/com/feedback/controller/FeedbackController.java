package com.feedback.controller;

import com.feedback.model.Feedback;
import com.feedback.service.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedbacks")
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {

    private final FeedbackService service;

    public FeedbackController(FeedbackService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Feedback>> getAll(
            @RequestParam(required = false) String search) {
        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(service.search(search));
        }
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<Feedback> create(@Valid @RequestBody Feedback feedback) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(feedback));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Feedback> update(
            @PathVariable Long id,
            @Valid @RequestBody Feedback feedback) {
        return ResponseEntity.ok(service.update(id, feedback));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
