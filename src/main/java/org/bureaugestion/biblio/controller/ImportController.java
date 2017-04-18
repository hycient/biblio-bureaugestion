package org.bureaugestion.biblio.controller;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.bureaugestion.biblio.AppConstants;
import org.bureaugestion.biblio.entities.FondDocumentaire;
import org.bureaugestion.biblio.entities.MissionBG;
import org.bureaugestion.biblio.entities.Ouvrage;
import org.bureaugestion.biblio.helpers.Static;
import org.bureaugestion.biblio.models.Response;
import org.bureaugestion.biblio.service.DaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Secured(value = {"ROLE_USER"})
public class ImportController {

    @Autowired
    private DaoService daoService;

    @RequestMapping(value = "/import/{ouvrage}/{fd}/{mission}", method = RequestMethod.POST)
    public Response importDataFromExcelFile(@RequestParam("file") MultipartFile multipartFile, @PathVariable("ouvrage") boolean ouvrage, @PathVariable("fd") boolean fd, @PathVariable("mission") boolean mission) {
        try {
            String fileName = multipartFile.getOriginalFilename();
            System.out.println("Nom du fichier upload\u00E9 : " + fileName);
            String contentType = multipartFile.getContentType();
            System.out.println("Content-type du fichier upload\u00E9 : " + contentType);
            if (contentType.equalsIgnoreCase(AppConstants.MS_EXCEL_2007_PLUS_CONTENT_TYPE)) {
                InputStream fileInputStream = multipartFile.getInputStream();

                Workbook workbook = new XSSFWorkbook(fileInputStream);
                List messages = new ArrayList();

                if (ouvrage) {
                    System.out.println("Importation des ouvrages...");
                    Map<String, List> ouvragesToExportMap = Static.importFromExcel(workbook, "OUVRAGE", Ouvrage.class.getName());
                    List ouvragesToExportList = ouvragesToExportMap.get("data");
                    messages.addAll(ouvragesToExportMap.get("messages"));
                    if (ouvragesToExportList != null && !ouvragesToExportList.isEmpty()) {
                        daoService.pushInBD(ouvragesToExportList, Ouvrage.class);
                    } else {
                        return Static.responseForExecption(new IllegalArgumentException("Le document \u00E0 import doit contenir une feuille nom\u00E9e OUVRAGE"), AppConstants.EXCEPTION_DEFAULT_CODE);
                    }
                }
                if (fd) {
                    System.out.println("Importation des fonds doc...");
                    Map<String, List> fdsToExportMap = Static.importFromExcel(workbook, "FOND DOCUMENTAIRE", FondDocumentaire.class.getName());
                    List fdsToExportList = fdsToExportMap.get("data");
                    messages.addAll(fdsToExportMap.get("messages"));
                    if (fdsToExportList != null && !fdsToExportList.isEmpty()) {
                        daoService.pushInBD(fdsToExportList, FondDocumentaire.class);
                    } else {
                        return Static.responseForExecption(new IllegalArgumentException("Le document \u00E0 import doit contenir une feuille nom\u00E9e FOND DOCUMENTARE"), AppConstants.EXCEPTION_DEFAULT_CODE);
                    }
                }
                if (mission) {
                    System.out.println("Importation des missions...");
                    Map<String, List> missionsToExportMap = Static.importFromExcel(workbook, "MISSION BG", MissionBG.class.getName());
                    List missionsToExportList = missionsToExportMap.get("data");
                    if (missionsToExportList != null && !missionsToExportList.isEmpty()) {
                        daoService.pushInBD(missionsToExportList, MissionBG.class);
                    } else {
                        return Static.responseForExecption(new IllegalArgumentException("Le document \u00E0 import doit contenir une feuille nom\u00E9e MISSION BG"), AppConstants.EXCEPTION_DEFAULT_CODE);
                    }
                }

                Response response = Static.responseForSuccessOperation(AppConstants.DEFAULT_RESPONSE_DATA);
                response.setMessages(messages);

                return response;
            } else {
                return Static.responseForExecption(new IllegalArgumentException("Le fichier \u00E0 importer doit \u00EAtre un fichier MS EXCEL 2007+"), AppConstants.EXCEPTION_DEFAULT_CODE);
            }
        } catch (IOException ex) {
            Logger.getLogger(ImportController.class.getName()).log(Level.SEVERE, "Import exception", ex);
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(ImportController.class.getName()).log(Level.SEVERE, "Import exception", ex);
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        } catch (InstantiationException ex) {
            Logger.getLogger(ImportController.class.getName()).log(Level.SEVERE, "Import exception", ex);
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        } catch (IllegalAccessException ex) {
            Logger.getLogger(ImportController.class.getName()).log(Level.SEVERE, "Import exception", ex);
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        } catch (NoSuchMethodException ex) {
            Logger.getLogger(ImportController.class.getName()).log(Level.SEVERE, "Import exception", ex);
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        } catch (IllegalArgumentException ex) {
            Logger.getLogger(ImportController.class.getName()).log(Level.SEVERE, "Import exception", ex);
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        } catch (InvocationTargetException ex) {
            Logger.getLogger(ImportController.class.getName()).log(Level.SEVERE, "Import exception", ex);
            return Static.responseForExecption(ex, AppConstants.EXCEPTION_DEFAULT_CODE);
        }
    }

}
