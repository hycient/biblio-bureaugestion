package org.bureaugestion.biblio;

/**
 *
 * @author hyacinthe
 */
public interface AppConstants {

    static final int BEGIN_ENTITY_FIELDS = 3;

    static final String VIEW_TO_BD_SEPARATOR = "#";
    static final String BD_TO_VIEW_SEPARATOR = "\n";

    static final int SUCCESS_OPERATION_CODE = 0;
    static final int EXCEPTION_DEFAULT_CODE = 1;

    /**
     *
     */
    static final String DEFAULT_RESPONSE_DATA = "OK";

    static final String MS_EXCEL_2007_PLUS_CONTENT_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    static final String NAMED_QUERY_FIND_BY_HASH_CODE_SUFFIX = ".findByHashCode";

}
