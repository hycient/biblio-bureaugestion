package org.bureaugestion.biblio.config;

import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 *
 * @author tadzotsa
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true) // ceci permet de protéger toutes les méthodes de l'application
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource dataSource;

    @Autowired
    public void globalConfig(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication()
                .dataSource(dataSource)
                .usersByUsernameQuery("SELECT username AS principal, password AS credentials, activated FROM users WHERE username = ?")
                .authoritiesByUsernameQuery("SELECT user_username AS principal, roles_role AS role FROM users_roles WHERE user_username = ?")
                .rolePrefix("ROLE_").passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override // cette méthode permet de définir les resources que l'on veut protéger
    protected void configure(HttpSecurity http) throws Exception {
        http
                // désactivation du CSRF
                .csrf().disable()
                //
                .authorizeRequests()
                .antMatchers("/assets/**", "/lib/**", "/views/**", "/favicon.jpg").permitAll()
                .anyRequest()
                .authenticated() // toutes requêtes doivent être authentifiées
                .and()
                //
                .formLogin()
                .loginPage("/login")
                .defaultSuccessUrl("/index.html")
                .permitAll()
                .and()
                //
                .logout()
                .invalidateHttpSession(true)
                .logoutUrl("/logout")
                .permitAll();
    }

}
