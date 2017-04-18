package org.bureaugestion.biblio.controller;

import org.bureaugestion.biblio.AppConstants;
import org.bureaugestion.biblio.entities.FondDocumentaire;
import org.bureaugestion.biblio.helpers.Static;
import org.bureaugestion.biblio.models.Response;
import org.bureaugestion.biblio.repositories.FondDocumentaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hyacinthe
 */
@RestController
@Secured(value = {"ROLE_USER"})
public class FondDocumentaireController {

    @Autowired
    private FondDocumentaireRepository fondDocumentaireRepository;

    @RequestMapping(path = "/fds/all")
    public Response getAllFds() {
        try {
            return Static.responseForSuccessOperation(fondDocumentaireRepository.findAll());
        } catch (Exception ex) {
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

    @RequestMapping(path = "/fds", method = RequestMethod.POST)
    public Response saveFd(@RequestBody FondDocumentaire fd) {
        try {
            // setting hasCode
            fd.setHashCode();
            return Static.responseForSuccessOperation(fondDocumentaireRepository.save(fd));
        } catch (Exception ex) {
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

    @RequestMapping(path = "/fds/all", method = RequestMethod.DELETE)
    public Response deleteAllFds() {
        try {
            fondDocumentaireRepository.deleteAll();
            return Static.responseForSuccessOperation(AppConstants.DEFAULT_RESPONSE_DATA);
        } catch (Exception ex) {
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

    @RequestMapping(path = "/fds/{id}", method = RequestMethod.DELETE)
    public Response deleteFd(@PathVariable Long id) {
        try {
            if (fondDocumentaireRepository.findOne(id) != null) {
                fondDocumentaireRepository.delete(id);

                return Static.responseForSuccessOperation(AppConstants.DEFAULT_RESPONSE_DATA);
            } else {
                return Static.responseForExecption(
                        new IllegalArgumentException("Pas de fond documentaire d'id " + id), AppConstants.EXCEPTION_DEFAULT_CODE
                );
            }
        } catch (Exception ex) {
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

}
