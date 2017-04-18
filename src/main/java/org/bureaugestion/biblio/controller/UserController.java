package org.bureaugestion.biblio.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.bureaugestion.biblio.AppConstants;
import org.bureaugestion.biblio.entities.User;
import org.bureaugestion.biblio.helpers.Static;
import org.bureaugestion.biblio.models.Response;
import org.bureaugestion.biblio.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hyacinthe
 */
@RestController
@Secured(value = {"ROLE_ADMIN", "ROLE_USER"})
public class UserController {

    @Autowired
    UserRepository userRepository;

    @RequestMapping(path = "/loged-user") // cette méthode permet d'obtenir l'utilisateur loged
    public Response getLogedUser(HttpServletRequest servletRequest) {
        try {
            HttpSession session = servletRequest.getSession();

            SecurityContext securityContext = (SecurityContext) session.getAttribute("SPRING_SECURITY_CONTEXT");

            String username = securityContext.getAuthentication().getName();

            User logedUser = userRepository.findOne(username);
            logedUser.setPassword("");

            return Static.responseForSuccessOperation(logedUser);
        } catch (Exception ex) {
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

}
