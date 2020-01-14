package org.example.controller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.model.Recording;

import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

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
