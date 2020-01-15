package org.example;

import org.example.model.Playlist;
import org.example.model.Recording;
import org.example.model.User;
import org.example.repository.PlaylistRepository;
import org.example.repository.RecordingRepository;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;


@SpringBootApplication
@DependsOn("Initializer") // TODO: why does it work? App doesn't start until every bean is constructed?
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }
}