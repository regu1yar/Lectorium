package org.example.repository;

import org.example.model.Recording;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "recordings")
public interface RecordingRepository extends JpaRepository<Recording, Long> {
}
