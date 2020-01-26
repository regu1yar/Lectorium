package org.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.DependsOn;


@SpringBootApplication
@DependsOn("Initializer") // TODO: why does it work? App doesn't start until every bean is constructed?
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }
}