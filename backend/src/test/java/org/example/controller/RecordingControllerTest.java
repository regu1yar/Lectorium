package org.example.controller;

import org.example.model.Recording;
import org.example.repository.RecordingRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RecordingControllerTest {
    @Autowired
    RecordingRepository repo;

    @Autowired
    RecordingController controller;

    @Test
    void save() {
        RecordingDTO recording = RecordingDTO.builder().name("hello").id(5L).build();
        controller.save(recording);
        Optional<Recording> result = repo.findById(5L);
        assertTrue(result.isPresent());
        assertEquals("hello", result.get().getName());
    }

    @Test
    void delete() {
        Recording recording = Recording.builder().name("hello").build();
        recording = repo.save(recording);
        controller.delete(new RecordingDTO(recording));
        assertFalse(repo.findById(recording.getId()).isPresent());
    }
}