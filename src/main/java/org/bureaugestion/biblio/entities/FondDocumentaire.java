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

@Entity
@Table(name = "FOND_DOCUMENTAIRE")
@NamedQueries({
    @NamedQuery(name = "FondDocumentaire" + AppConstants.NAMED_QUERY_FIND_BY_HASH_CODE_SUFFIX, query = "SELECT fd FROM FondDocumentaire fd WHERE fd.hashCode = :hashCode")
})
public class FondDocumentaire implements Serializable {

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
    @Column(name = "MATIERE")
    private String matiere;
    @Lob
    @Column(name = "SPECIALITE")
    private String specialite;
    @Lob
    @Column(name = "TITRE")
    private String titre;
    @Lob
    @Column(name = "NATURE")
    private String nature;
    @Lob
    @Column(name = "ETAS_ORGANISATIONS_AUTEURS")
    private String etatsOrganisationsAuteurs;
    @Column(name = "ANNEE")
    private String annee;
    @Column(name = "EMPLACEMENT")
    private String emplacement;

    public FondDocumentaire() {
    }

    public FondDocumentaire(Long id) {
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

    public String getMatiere() {
        return matiere;
    }

    public void setMatiere(Object object) {
        this.matiere = (object != null) ? object.toString().trim() : "";
    }

    public String getSpecialite() {
        return specialite;
    }

    public void setSpecialite(Object object) {
        this.specialite = (object != null) ? object.toString().trim() : "";
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(Object object) {
        this.titre = (object != null) ? object.toString().trim() : "";
    }

    public String getNature() {
        return nature;
    }

    public void setNature(Object object) {
        this.nature = (object != null) ? object.toString().trim() : "";
    }

    public String getEtatsOrganisationsAuteurs() {
        return etatsOrganisationsAuteurs == null
                ? null
                : String.join(AppConstants.BD_TO_VIEW_SEPARATOR, etatsOrganisationsAuteurs.split(AppConstants.VIEW_TO_BD_SEPARATOR));
    }

    public void setEtatsOrganisationsAuteurs(Object object) {
        this.etatsOrganisationsAuteurs = (object != null) ? object.toString().trim() : "";
    }

    public String getAnnee() {
        return annee;
    }

    public void setAnnee(Object object) {
        this.annee = (object != null) ? object.toString().trim() : "";
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
        int hash = 3;
        hash = 23 * hash + Objects.hashCode(this.id);
        hash = 23 * hash + Objects.hashCode(this.domaine);
        hash = 23 * hash + Objects.hashCode(this.matiere);
        hash = 23 * hash + Objects.hashCode(this.specialite);
        hash = 23 * hash + Objects.hashCode(this.titre);
        hash = 23 * hash + Objects.hashCode(this.nature);
        hash = 23 * hash + Objects.hashCode(this.etatsOrganisationsAuteurs);
        hash = 23 * hash + Objects.hashCode(this.annee);
        hash = 23 * hash + Objects.hashCode(this.emplacement);
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
        final FondDocumentaire other = (FondDocumentaire) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.domaine, other.domaine)) {
            return false;
        }
        if (!Objects.equals(this.matiere, other.matiere)) {
            return false;
        }
        if (!Objects.equals(this.specialite, other.specialite)) {
            return false;
        }
        if (!Objects.equals(this.titre, other.titre)) {
            return false;
        }
        if (!Objects.equals(this.nature, other.nature)) {
            return false;
        }
        if (!Objects.equals(this.etatsOrganisationsAuteurs, other.etatsOrganisationsAuteurs)) {
            return false;
        }
        if (!Objects.equals(this.annee, other.annee)) {
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
        return "{" + "\"id\":" + idString + ",\"hashCode\":" + hashCode + ",\"domaine\":\"" + domaine + "\",\"matiere\":\"" + matiere + "\",\"specialite\":\"" + specialite + "\",\"titre\":\"" + titre + "\",\"nature\":\"" + nature + "\",\"etatsOrganisationsAuteurs\":\"" + etatsOrganisationsAuteurs + "\",\"annee\":\"" + annee + "\",\"emplacement\":\"" + emplacement + "\"}";
    }

}
