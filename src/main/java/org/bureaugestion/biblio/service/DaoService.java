package org.bureaugestion.biblio.service;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.bureaugestion.biblio.AppConstants;
import org.bureaugestion.biblio.entities.FondDocumentaire;
import org.bureaugestion.biblio.entities.MissionBG;
import org.bureaugestion.biblio.entities.Ouvrage;
import org.bureaugestion.biblio.repositories.FondDocumentaireRepository;
import org.bureaugestion.biblio.repositories.MissionBGRepository;
import org.bureaugestion.biblio.repositories.OuvrageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author hyacinthe
 */
@Service
public class DaoService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private OuvrageRepository ouvrageRepository;
    @Autowired
    private FondDocumentaireRepository fondDocumentaireRepository;
    @Autowired
    private MissionBGRepository missionBGRepository;

    private void create(Object entity, Class clazz) {
        if (clazz == Ouvrage.class) {
            ouvrageRepository.save((Ouvrage) entity);
        } else if (clazz == FondDocumentaire.class) {
            fondDocumentaireRepository.save((FondDocumentaire) entity);
        } else if (clazz == MissionBG.class) {
            missionBGRepository.save((MissionBG) entity);
        }
    }

    private boolean findByHash(Class clazz, Integer hashCode) {
        try {
            return !entityManager.createNamedQuery(clazz.getSimpleName() + AppConstants.NAMED_QUERY_FIND_BY_HASH_CODE_SUFFIX)
                    .setParameter("hashCode", hashCode).getResultList().isEmpty();
        } catch (Exception ex) {
            Logger.getLogger(DaoService.class.getName()).log(Level.SEVERE, "Probl\u00E8me survenue lors de la persistence", ex);

            return false;
        }
    }

    public void pushInBD(List itemsToPush, Class clazz) {
        Method currentMethod;
        Integer currentHashCode;
        boolean isItemInBD;

        for (Object item : itemsToPush) {
            try {
                // on récupère le hash
                currentMethod = clazz.getMethod("getHashCode");
                currentHashCode = Integer.parseInt(currentMethod.invoke(item).toString());
                isItemInBD = findByHash(clazz, currentHashCode);
                if (!isItemInBD) {
                    //System.out.println("ENTIT\u00C9 \u00C0 SAUVEGARDER :");
                    //System.out.println(clazz.cast(item));
                    //System.out.println();
                    create(clazz.cast(item), clazz);
                }
            } catch (NoSuchMethodException ex) {
                Logger.getLogger(DaoService.class.getName()).log(Level.SEVERE, null, ex);
            } catch (SecurityException ex) {
                Logger.getLogger(DaoService.class.getName()).log(Level.SEVERE, null, ex);
            } catch (IllegalAccessException ex) {
                Logger.getLogger(DaoService.class.getName()).log(Level.SEVERE, null, ex);
            } catch (IllegalArgumentException ex) {
                Logger.getLogger(DaoService.class.getName()).log(Level.SEVERE, null, ex);
            } catch (InvocationTargetException ex) {
                Logger.getLogger(DaoService.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

}
