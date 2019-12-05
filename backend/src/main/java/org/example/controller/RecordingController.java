package org.example.controller;

import org.example.model.Recording;
import org.example.repository.RecordingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class RecordingController {
    @Autowired
    RecordingRepository repo;

    @GetMapping("/api/recordings")
    public List<Recording> gr() {
        return repo.findAll();
    }
}
