package org.example.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.example.model.Recording;
import org.example.repository.PlaylistRepository;
import org.example.repository.RecordingRepository;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class RecordingDTO {
    Long id;
    String name;
    Timestamp start;
    Timestamp end;
    @NotNull // TODO: other NotNulls?
    Recording.Status status;
    Long playlistId;
    Integer playlistIndex;
    Long operatorId;
    Long editorId;

    RecordingDTO(Recording rec) { // haha, boilerplate
        this.id = rec.getId();
        this.name = rec.getName();
        this.start = rec.getStart();
        this.end = rec.getEnd();
        this.status = rec.getStatus();
        this.playlistId = rec.getPlaylist() == null ? null : rec.getPlaylist().getId();
        this.playlistIndex = rec.getPlaylistIndex();
        this.operatorId = rec.getOperator() == null ? null : rec.getOperator().getId();
        this.editorId = rec.getEditor() == null ? null : rec.getEditor().getId();
    }
}



@CrossOrigin
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
}
