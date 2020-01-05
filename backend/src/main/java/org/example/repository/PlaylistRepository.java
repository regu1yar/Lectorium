package org.example.repository;

import org.example.model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
}