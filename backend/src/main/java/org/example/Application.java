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
import java.sql.Time;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.Function;
import java.util.function.IntSupplier;
import java.util.function.IntUnaryOperator;
import java.util.function.UnaryOperator;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;


@Component("Initializer")
class Initializer {
    <T> T getRand(List<T> src) {
        return src.get(ThreadLocalRandom.current().nextInt(src.size()));
    }

    Timestamp randTIme() {
        long offset = Timestamp.valueOf("2019-09-01 00:00:00").getTime();
        long end = Timestamp.valueOf("2019-11-23 00:00:00").getTime();
        long diff = end - offset + 1;
        return new Timestamp(offset + (long)(ThreadLocalRandom.current().nextFloat() * diff));
    }

    @Autowired
    Initializer(UserRepository usersRepo, PlaylistRepository playlistsRepo, RecordingRepository recordingsRepo) throws InterruptedException {
        List<User> users = Stream.of("Mask", "Leha", "Roma", "Sasha", "Dima", "Dasha").map(name -> User.builder().name(name).build()).collect(Collectors.toList());
        usersRepo.saveAll(users);

        List<Playlist> playlists = Stream.of("Матан 2019", "Алгем 2019", "Метопты 2019", "АКОС 2019").map(
                name -> Playlist.builder().name(name).build()).collect(Collectors.toList());
        playlistsRepo.saveAll(playlists);

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

        Map<Playlist, Integer> sizes = new HashMap<>();
        Function<Playlist, Integer> advpl = (Playlist pl) -> {
            Integer sz = sizes.getOrDefault(pl, 0);
            sizes.put(pl, ++sz);
            return sz;
        };

        List<Recording> recordings = IntStream.range(0, 10).mapToObj(idx -> {
                    Playlist pl = getRand(playlists);
                    return Recording.builder()
                            .name(getRand(desc))
                            .status(getRand(s))
                            .playlist(pl)
                            .playlist_index(advpl.apply(pl))
                            .operator(getRand(users))
                            .editor(getRand(users))
                            .time(randTIme())
                            .build();
                }
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
