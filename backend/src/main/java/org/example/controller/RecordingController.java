package org.example.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.example.model.Recording;
import org.example.repository.RecordingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class RecordingController {
    @Autowired
    RecordingRepository repo;

    @GetMapping("/api/recordings")
    public List<Recording> get() {
        return repo.findAll();
    }

    // TODO: separate creation and update
    @PostMapping(value = "/api/recordings/save", consumes = "application/json")
    public void save(@RequestBody Recording rec) {
        repo.save(rec);
    }
}
