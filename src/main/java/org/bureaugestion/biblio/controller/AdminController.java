package org.bureaugestion.biblio.controller;

import java.util.List;
import javax.websocket.server.PathParam;
import org.bureaugestion.biblio.AppConstants;
import org.bureaugestion.biblio.entities.Role;
import org.bureaugestion.biblio.entities.User;
import org.bureaugestion.biblio.helpers.Static;
import org.bureaugestion.biblio.models.Response;
import org.bureaugestion.biblio.repositories.RoleRepository;
import org.bureaugestion.biblio.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author tadzotsa
 */
@RestController
@Secured(value = {"ROLE_ADMIN"})
public class AdminController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @RequestMapping(path = "/users", method = RequestMethod.POST)
    public Response saveUser(@RequestBody User user) {
        try {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String hashedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);
            user = userRepository.save(user);
            user.setPassword("***");
            return Static.responseForSuccessOperation(user);
        } catch (Exception ex) {
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

    @RequestMapping(path = "/users", method = RequestMethod.DELETE)
    public Response saveUser(@PathParam("username") String username) {
        try {
            User userToDelete = userRepository.findOne(username);
            if (userToDelete != null) {
                userRepository.delete(userToDelete);

                return Static.responseForSuccessOperation(AppConstants.DEFAULT_RESPONSE_DATA);
            } else {
                return Static.responseForExecption(
                        new IllegalArgumentException("Pas d'utilisateur d'email " + username), AppConstants.EXCEPTION_DEFAULT_CODE
                );
            }
        } catch (Exception ex) {
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

    @RequestMapping(path = "/users/all")
    public Response getAllUsers() {
        try {
            List<User> users = userRepository.findAll();

            for (User user : users) {
                user.setPassword("***");
            }

            return Static.responseForSuccessOperation(users);
        } catch (Exception ex) {
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

    @RequestMapping(path = "/roles", method = RequestMethod.POST)
    public Response saveRole(@RequestBody Role role) {
        try {
            return Static.responseForSuccessOperation(roleRepository.save(role));
        } catch (Exception ex) {
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

    @RequestMapping(path = "/roles/all")
    public Response getAllRoles() {
        try {
            return Static.responseForSuccessOperation(roleRepository.findAll());
        } catch (Exception ex) {
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

    @RequestMapping(path = "/users-roles/{username}/{rolename}", method = RequestMethod.POST)
    public Response addRoleToUser(@PathVariable("username") String username, @PathVariable("rolename") String rolename) {
        try {
            User user = userRepository.findOne(username);
            Role role = roleRepository.findOne(rolename);

            if (user != null && role != null) {
                user.getRoles().add(role);
                return Static.responseForSuccessOperation(userRepository.save(user));
            } else {
                return Static.responseForExecption(new NullPointerException("Les \u00E9l\u00E9ments fournies sont inexistants"), AppConstants.EXCEPTION_DEFAULT_CODE);
            }
        } catch (Exception ex) {
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

}
