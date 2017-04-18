package org.bureaugestion.biblio.entities;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import org.bureaugestion.biblio.AppConstants;

/**
 *
 * @author hyacinthe
 */
@Entity
@Table(name = "MISSION_BG")
@NamedQueries({
    @NamedQuery(name = "MissionBG" + AppConstants.NAMED_QUERY_FIND_BY_HASH_CODE_SUFFIX, query = "SELECT m FROM MissionBG m WHERE m.hashCode = :hashCode")
})
public class MissionBG implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "HASH_CODE")
    private Integer hashCode;
    @Lob
    @Column(name = "DOMAINE")
    private String domaine;
    @Lob
    @Column(name = "ORGANISATIONS_SOLLICITATRICES")
    private String organisationsSollicitatrices;
    @Column(name = "ANNEE")
    private String annee;
    @Lob
    @Column(name = "NATURE")
    private String nature;
    @Lob
    @Column(name = "OBJET")
    private String objet;
    @Lob
    @Column(name = "DOCUMENTS")
    private String documents;
    @Column(name = "EMPLACEMENT")
    private String emplacement;

    public MissionBG() {
    }

    public MissionBG(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDomaine() {
        return domaine;
    }

    public void setDomaine(Object object) {
        this.domaine = (object != null) ? object.toString().trim() : "";
    }

    public String getOrganisationsSollicitatrices() {
        return organisationsSollicitatrices == null
                ? null
                : String.join(AppConstants.BD_TO_VIEW_SEPARATOR, organisationsSollicitatrices.split(AppConstants.VIEW_TO_BD_SEPARATOR));
    }

    public void setOrganisationsSollicitatrices(Object object) {
        this.organisationsSollicitatrices = (object != null) ? object.toString().trim() : "";
    }

    public String getAnnee() {
        return annee;
    }

    public void setAnnee(Object object) {
        this.annee = (object != null) ? object.toString().trim() : "";
    }

    public String getNature() {
        return nature;
    }

    public void setNature(Object object) {
        this.nature = (object != null) ? object.toString().trim() : "";
    }

    public String getObjet() {
        return objet;
    }

    public void setObjet(Object object) {
        this.objet = (object != null) ? object.toString().trim() : "";
    }

    public String getDocuments() {
        return documents == null
                ? null
                : String.join(AppConstants.BD_TO_VIEW_SEPARATOR, documents.split(AppConstants.VIEW_TO_BD_SEPARATOR));
    }

    public void setDocuments(Object object) {
        this.documents = (object != null) ? object.toString().trim() : "";
    }

    public String getEmplacement() {
        return emplacement;
    }

    public void setEmplacement(Object object) {
        this.emplacement = (object != null) ? object.toString().trim() : "";
    }

    public Integer getHashCode() {
        return hashCode;
    }

    public void setHashCode() {
        this.hashCode = hashCode();
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 23 * hash + Objects.hashCode(this.id);
        hash = 31 * hash + Objects.hashCode(this.domaine);
        hash = 31 * hash + Objects.hashCode(this.organisationsSollicitatrices);
        hash = 31 * hash + Objects.hashCode(this.annee);
        hash = 31 * hash + Objects.hashCode(this.nature);
        hash = 31 * hash + Objects.hashCode(this.objet);
        hash = 31 * hash + Objects.hashCode(this.documents);
        hash = 31 * hash + Objects.hashCode(this.emplacement);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final MissionBG other = (MissionBG) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.domaine, other.domaine)) {
            return false;
        }
        if (!Objects.equals(this.organisationsSollicitatrices, other.organisationsSollicitatrices)) {
            return false;
        }
        if (!Objects.equals(this.annee, other.annee)) {
            return false;
        }
        if (!Objects.equals(this.nature, other.nature)) {
            return false;
        }
        if (!Objects.equals(this.objet, other.objet)) {
            return false;
        }
        if (!Objects.equals(this.documents, other.documents)) {
            return false;
        }

        return Objects.equals(this.emplacement, other.emplacement);
    }

    @Override
    public String toString() {
        String idString = "{}";
        if (id != null) {
            idString = id.toString();
        }
        return "{" + "\"id\":" + idString + ",\"hashCode\":" + hashCode + ",\"domaine\":\"" + domaine + "\",\"organisationsSollicitatrices\":\"" + organisationsSollicitatrices + "\",\"annee\":\"" + annee + "\",\"nature\":\"" + nature + "\",\"objet\":\"" + objet + "\",\"documents\":\"" + documents + "\",\"emplacement\":\"" + emplacement + "\"}";
    }

}
