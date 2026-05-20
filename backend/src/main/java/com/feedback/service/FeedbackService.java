package com.feedback.service;

import com.feedback.model.Feedback;
import com.feedback.repository.FeedbackRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepository repository;

    public FeedbackService(FeedbackRepository repository) {
        this.repository = repository;
    }

    public List<Feedback> getAll() {
        return repository.findAll();
    }

    public Feedback create(Feedback feedback) {
        return repository.save(feedback);
    }

    public Feedback update(Long id, Feedback updated) {
        Feedback existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found with id: " + id));
        existing.setUserName(updated.getUserName());
        existing.setProductName(updated.getProductName());
        existing.setMessage(updated.getMessage());
        existing.setRating(updated.getRating());
        return repository.save(existing);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Feedback not found with id: " + id);
        }
        repository.deleteById(id);
    }

    public List<Feedback> search(String query) {
        return repository.findByUserNameContainingIgnoreCaseOrProductNameContainingIgnoreCase(query, query);
    }
}
