package org.bureaugestion.biblio.controller;

import org.bureaugestion.biblio.AppConstants;
import org.bureaugestion.biblio.entities.Ouvrage;
import org.bureaugestion.biblio.helpers.Static;
import org.bureaugestion.biblio.models.Response;
import org.bureaugestion.biblio.repositories.OuvrageRepository;
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
public class OuvrageController {

    @Autowired
    private OuvrageRepository ouvrageRepository;

    @RequestMapping(path = "/ouvrages/all")
    public Response getAllOuvrages() {
        try {
            return Static.responseForSuccessOperation(ouvrageRepository.findAll());
        } catch (Exception ex) {
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

    @RequestMapping(path = "/ouvrages", method = RequestMethod.POST)
    public Response saveOuvrage(@RequestBody Ouvrage ouvrage) {
        try {
            // setting hasCode
            ouvrage.setHashCode();
            return Static.responseForSuccessOperation(ouvrageRepository.save(ouvrage));
        } catch (Exception ex) {
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

    @RequestMapping(path = "/ouvrages/all", method = RequestMethod.DELETE)
    public Response deleteAllOuvrages() {
        try {
            ouvrageRepository.deleteAll();
            return Static.responseForSuccessOperation(AppConstants.DEFAULT_RESPONSE_DATA);
        } catch (Exception ex) {
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

    @RequestMapping(path = "/ouvrages/{id}", method = RequestMethod.DELETE)
    public Response deleteOuvrage(@PathVariable Long id) {
        try {
            if (ouvrageRepository.findOne(id) != null) {
                ouvrageRepository.delete(id);

                return Static.responseForSuccessOperation(AppConstants.DEFAULT_RESPONSE_DATA);
            } else {
                return Static.responseForExecption(
                        new IllegalArgumentException("Pas d'ouvrage d'id " + id), AppConstants.EXCEPTION_DEFAULT_CODE
                );
            }
        } catch (Exception ex) {
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

}
