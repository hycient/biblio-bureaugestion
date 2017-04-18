package org.bureaugestion.biblio.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 *
 * @author tadzotsa
 */
@Configuration
public class WebMVCConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // pour faire la correspondance entre les urls et les vues
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/logout").setViewName("login");
    }

}
