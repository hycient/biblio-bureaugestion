package org.bureaugestion.biblio.helpers;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.bureaugestion.biblio.AppConstants;
import org.bureaugestion.biblio.models.Response;

public class Static {

    public Static() {
    }

    // liste des messages d'erreur d'une exception
    public static List<String> getErreursForException(Exception exception) {
        // on récupère la liste des messages d'erreur de l'exception
        Throwable cause = exception;
        List<String> erreurs = new ArrayList<String>();
        while (cause != null) {
            erreurs.add(cause.getMessage());
            cause = cause.getCause();
        }
        return erreurs;
    }

    public static Response responseForExecption(Exception ex, Integer code) {
        return new Response(code, Static.getErreursForException(ex));
    }

    public static Response responseForSuccessOperation(Object data) {
        return new Response(0, data);
    }

    public static Map<String, List> importFromExcel(Workbook workbook, String sheetName, String qualifiedClassName) throws ClassNotFoundException, InstantiationException, IllegalAccessException, NoSuchMethodException, IllegalArgumentException, InvocationTargetException {
        Map<String, List> resultMap = new HashMap<String, List>();

        List itemsImportedList = new ArrayList();
        List messagesList = new ArrayList();
        Class classe = Class.forName(qualifiedClassName);
        // noms de champs
        List<String> columNames = getColumNames(qualifiedClassName, AppConstants.BEGIN_ENTITY_FIELDS);
        //System.out.println(columNames);
        int nbFiels = columNames.size();
        Method method;

        Sheet sheet = workbook.getSheet(sheetName);
        if (sheet == null) {
            System.err.println("LE DOCUMENT A IMPORTER NE CONTIENT PAS LA FUEILLE NOMMEE : " + sheetName);

            return null;
        }

        Row row;
        // on cherche la première ligne où se trouvent les données
        int beginRowIndex = 0;
        boolean canBegin;
        String cellValue;
        do {
            row = sheet.getRow(beginRowIndex);
            try {
                //System.out.println(beginRow + " : " + row.getCell(0));
                cellValue = row.getCell(0).toString();
                Double.parseDouble(cellValue);
                canBegin = true;
            } catch (NullPointerException ex) {
                canBegin = false;
                beginRowIndex++;
                //Logger.getLogger(Utils.class.getName()).log(Level.SEVERE, null, ex);
            } catch (NumberFormatException ex) {
                canBegin = false;
                beginRowIndex++;
                //Logger.getLogger(Utils.class.getName()).log(Level.SEVERE, null, ex);
            }
        } while (!canBegin);

        Object item;
        boolean canStop;

        //System.out.println("Récupération des données");
        do {
            // avant de récupérer les données sur les colonnes on s'assure que la ligne en a : elle doit pour cela être numérotée
            row = sheet.getRow(beginRowIndex);
            try {
                row.getCell(0).setCellType(Cell.CELL_TYPE_STRING);
                cellValue = row.getCell(0).toString();
                Double.parseDouble(cellValue);
                canStop = false;
            } catch (NullPointerException ex) {
                canStop = true;
                //Logger.getLogger(Utils.class.getName()).log(Level.SEVERE, null, ex);
            } catch (NumberFormatException ex) {
                canStop = true;
                //Logger.getLogger(Utils.class.getName()).log(Level.SEVERE, null, ex);
            }
            if (canStop) {
                break;
            }

            item = classe.newInstance();
            //System.out.print(row.getCell(0) + " ");
            //System.out.println("R\u00C9CUP\u00C9RATION DE L'\u00C9L\u00C9MENT DE LA COLONNE " + (beginRowIndex));
            for (int j = 0; j < nbFiels; j++) {
                //System.out.println("COLONNE CONCERN\u00C9E : " + columNames.get(j));
                String methodName = "set" + columNames.get(j).substring(0, 1).toUpperCase() + columNames.get(j).substring(1);
                //System.out.println("M\u00C9THODE CONCERN\u00C9E : " + methodName);
                method = classe.getMethod(methodName, Object.class);
                //System.out.println("VALEUR AFFECT\u00C9E : " + row.getCell(j + 1));
                method.invoke(item, row.getCell(j + 1));
            }
            // on met à jour le hasher
            method = classe.getMethod("setHashCode");
            method.invoke(item);

            itemsImportedList.add(item);
            ++beginRowIndex;
        } while (true);

        resultMap.put("data", itemsImportedList);
        resultMap.put("messages", messagesList);

        return resultMap;
    }

    private static List<String> getColumNames(String qualifiedClassName, int begin) throws ClassNotFoundException {
        List<String> columNames = new ArrayList<String>();
        Class classe = Class.forName(qualifiedClassName);
        Field[] fields = classe.getDeclaredFields();
        int nbFields = fields.length;
        for (int i = begin; i < nbFields; i++) {
            columNames.add(fields[i].getName());
        }
        return columNames;
    }

}
