package org.example.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Recording {
    public enum Status {PLANNED, READY, FAILED};

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Timestamp time;

    private Status status;

    @ManyToOne
    private Playlist playlist;

    private Integer playlist_index;

    @ManyToOne
    private User operator;
    @ManyToOne
    private User editor;
}
