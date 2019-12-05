package org.example;

import lombok.Data;
import org.example.model.Playlist;
import org.example.model.Recording;
import org.example.model.User;
import org.example.repository.PlaylistRepository;
import org.example.repository.RecordingRepository;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.DependsOn;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import javax.persistence.Entity;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Component("Initializer")
class Initializer {
    @Autowired
    Initializer(UserRepository usersRepo, PlaylistRepository playlistsRepo, RecordingRepository recordingsRepo) throws InterruptedException {
        List<User> users = Stream.of("Mask", "Leha", "Roma").map(name -> User.builder().name(name).build()).collect(Collectors.toList());
        usersRepo.saveAll(users);

        Playlist playlist = playlistsRepo.save(Playlist.builder().name("Matan 2019").build());

        List<Recording.Status> s = new ArrayList<Recording.Status>(){{
            add(Recording.Status.PLANNED);
            add(Recording.Status.FAILED);
            add(Recording.Status.READY);
        }};

        List<String> desc = new ArrayList<String>(){{
            add("консультация");
            add("интегралы");
            add("рецепт фасолей");
        }};

        List<Recording> recordings = Stream.of(1, 2, 3).map(idx ->
                Recording.builder()
                        .name(desc.get(idx - 1))
                        .status(s.get(idx - 1))
                        .playlist(playlist)
                        .playlist_index(idx)
                        .operator(users.get(ThreadLocalRandom.current().nextInt(users.size())))
                        .editor(users.get(ThreadLocalRandom.current().nextInt(users.size())))
                        .time(Timestamp.valueOf("2019-09-0" + idx + " 12:20:00"))
                        .build()
            ).collect(Collectors.toList());

        recordingsRepo.saveAll(recordings);
    }
}


@SpringBootApplication
@DependsOn("Initializer") // TODO: why it works? App doesn't start until every bean is constructed?
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }
}
