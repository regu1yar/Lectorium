package org.example.controller;

import org.example.model.Playlist;
import org.example.repository.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class PlaylistController {
    @Autowired
    PlaylistRepository repo;

    @GetMapping("/api/playlists")
    public List<Playlist> gr() {
        return repo.findAll();
    }
}