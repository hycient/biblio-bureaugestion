package org.bureaugestion.biblio.controller;

import org.bureaugestion.biblio.AppConstants;
import org.bureaugestion.biblio.entities.MissionBG;
import org.bureaugestion.biblio.helpers.Static;
import org.bureaugestion.biblio.models.Response;
import org.bureaugestion.biblio.repositories.MissionBGRepository;
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
public class MissionBGController {

    @Autowired
    private MissionBGRepository missionBGRepository;

    @RequestMapping(path = "/missions/all")
    public Response getAllMissions() {
        try {
            return Static.responseForSuccessOperation(missionBGRepository.findAll());
        } catch (Exception ex) {
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

    @RequestMapping(path = "/missions", method = RequestMethod.POST)
    public Response saveMission(@RequestBody MissionBG missionBG) {
        try {
            // setting hasCode
            missionBG.setHashCode();
            return Static.responseForSuccessOperation(missionBGRepository.save(missionBG));
        } catch (Exception ex) {
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

    @RequestMapping(path = "/missions/all", method = RequestMethod.DELETE)
    public Response deleteAllMissions() {
        try {
            missionBGRepository.deleteAll();
            return Static.responseForSuccessOperation(AppConstants.DEFAULT_RESPONSE_DATA);
        } catch (Exception ex) {
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

    @RequestMapping(path = "/missions/{id}", method = RequestMethod.DELETE)
    public Response deleteMission(@PathVariable Long id) {
        try {
            if (missionBGRepository.findOne(id) != null) {
                missionBGRepository.delete(id);

                return Static.responseForSuccessOperation(AppConstants.DEFAULT_RESPONSE_DATA);
            } else {
                return Static.responseForExecption(
                        new IllegalArgumentException("Pas de mission d'id " + id), AppConstants.EXCEPTION_DEFAULT_CODE
                );
            }
        } catch (Exception ex) {
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

}
