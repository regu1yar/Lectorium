package org.example.controller;

import lombok.*;
import org.example.model.Recording;
import org.example.repository.PlaylistRepository;
import org.example.repository.RecordingRepository;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;


@RestController
public class RecordingController {
    @Autowired
    RecordingRepository repo;

    @Autowired
    UserRepository users;

    @Autowired
    PlaylistRepository playlists;

    // TODO: throws NoSuchElementException
    <T> T getById(Long id, CrudRepository<T, Long> repository) {
        if (id == null)
            return null;
        return repository.findById(id).get();
    }

    Recording fromDTO(RecordingDTO recDTO) {
        return Recording.builder()
                .id(recDTO.getId())
                .name(recDTO.getName())
                .start(recDTO.getStart())
                .end(recDTO.getEnd())
                .status(recDTO.getStatus())
                .playlist(
                        getById(recDTO.getPlaylistId(), playlists))
                .playlistIndex(recDTO.getPlaylistIndex())
                .operator(
                        getById(recDTO.getOperatorId(), users))
                .editor(
                        getById(recDTO.getEditorId(), users))
                .build();
    }

    @GetMapping("/api/recordings")
    public List<RecordingDTO> all() {
        return repo.findAll().stream().map(RecordingDTO::new).collect(Collectors.toList());
    }

    // TODO: separate creation and update?
    @PostMapping(value = "/api/recordings/save", consumes = "application/json")
    public void save(@Valid @RequestBody RecordingDTO recDTO) {
        repo.save(fromDTO(recDTO));
    }

    @PostMapping(value = "/api/recordings/delete", consumes = "application/json")
    public void delete(@Valid @RequestBody RecordingDTO recDTO) {
        repo.delete(fromDTO(recDTO));
    }
}
