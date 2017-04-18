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
@Table(name = "OUVRAGE")
@NamedQueries({
    @NamedQuery(name = "Ouvrage" + AppConstants.NAMED_QUERY_FIND_BY_HASH_CODE_SUFFIX, query = "SELECT o FROM Ouvrage o WHERE o.hashCode = :hashCode")
})
public class Ouvrage implements Serializable {

    private static final long serialVersionUID = -4968929420924343439L;

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
    @Column(name = "AUTEURS")
    private String auteurs;
    @Lob
    @Column(name = "ETATS_ORGANISATIONS")
    private String etatsOrganisations;
    @Column(name = "ANNEE")
    private String annee;
    @Lob
    @Column(name = "REVUE_COLLECTION")
    private String revueCollection;
    @Column(name = "NUM_SERIE")
    private String numSerie;
    @Lob
    @Column(name = "EDITION")
    private String edition;
    @Column(name = "EMPLACEMENT")
    private String emplacement;

    public Ouvrage() {
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

    public String getAuteurs() {
        return auteurs == null
                ? null
                : String.join(AppConstants.BD_TO_VIEW_SEPARATOR, auteurs.split(AppConstants.VIEW_TO_BD_SEPARATOR));
    }

    public void setAuteurs(Object object) {
        this.auteurs = (object != null) ? object.toString().trim() : "";
    }

    public String getEtatsOrganisations() {
        return etatsOrganisations == null
                ? null
                : String.join(AppConstants.BD_TO_VIEW_SEPARATOR, etatsOrganisations.split(AppConstants.VIEW_TO_BD_SEPARATOR));
    }

    public void setEtatsOrganisations(Object object) {
        this.etatsOrganisations = (object != null) ? object.toString().trim() : "";
    }

    public String getAnnee() {
        return annee;
    }

    public void setAnnee(Object object) {
        this.annee = (object != null) ? object.toString().trim() : "";
    }

    public String getRevueCollection() {
        return revueCollection;
    }

    public void setRevueCollection(Object object) {
        this.revueCollection = (object != null) ? object.toString().trim() : "";
    }

    public String getNumSerie() {
        return numSerie;
    }

    public void setNumSerie(Object object) {
        this.numSerie = (object != null) ? object.toString().trim() : "";
    }

    public String getEdition() {
        return edition;
    }

    public void setEdition(Object object) {
        this.edition = (object != null) ? object.toString().trim() : "";
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
        hash = 23 * hash + Objects.hashCode(this.domaine);
        hash = 23 * hash + Objects.hashCode(this.matiere);
        hash = 23 * hash + Objects.hashCode(this.specialite);
        hash = 23 * hash + Objects.hashCode(this.titre);
        hash = 23 * hash + Objects.hashCode(this.auteurs);
        hash = 23 * hash + Objects.hashCode(this.etatsOrganisations);
        hash = 23 * hash + Objects.hashCode(this.annee);
        hash = 23 * hash + Objects.hashCode(this.revueCollection);
        hash = 23 * hash + Objects.hashCode(this.numSerie);
        hash = 23 * hash + Objects.hashCode(this.edition);
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
        final Ouvrage other = (Ouvrage) obj;
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
        if (!Objects.equals(this.auteurs, other.auteurs)) {
            return false;
        }
        if (!Objects.equals(this.etatsOrganisations, other.etatsOrganisations)) {
            return false;
        }
        if (!Objects.equals(this.annee, other.annee)) {
            return false;
        }
        if (!Objects.equals(this.revueCollection, other.revueCollection)) {
            return false;
        }
        if (!Objects.equals(this.numSerie, other.numSerie)) {
            return false;
        }
        if (!Objects.equals(this.edition, other.edition)) {
            return false;
        }
        if (!Objects.equals(this.emplacement, other.emplacement)) {
            return false;
        }

        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {
        String idString = "{}";
        if (id != null) {
            idString = id.toString();
        }
        return "{" + "\"id\":" + idString + ",\"hashCode\":" + hashCode + ",\"domaine\":\"" + domaine + "\",\"matiere\":\"" + matiere + "\",\"specialite\":\"" + specialite + "\",\"titre\":\"" + titre + "\",\"auteurs\":\"" + auteurs + "\",\"etatsOrganisations\":\"" + etatsOrganisations + "\",\"annee\":\"" + annee + "\",\"revueCollection\":\"" + revueCollection + "\",\"numSerie\":\"" + numSerie + "\",\"edition\":\"" + edition + "\",\"emplacement\":\"" + emplacement + "\"}";
    }

}
