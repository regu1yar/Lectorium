package org.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SPAController {
    // WARNING: favicons and other things should be placed under static/ or mentioned here
    // TODO?: maybe use something like NotFound handler instead of this
    @GetMapping("/{path:^(?!api$|static$|index.html$).*}/**")
    String forwardToIndex() {
        return "forward:/index.html";
    }
}
