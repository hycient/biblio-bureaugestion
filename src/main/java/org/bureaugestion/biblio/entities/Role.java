package org.bureaugestion.biblio.entities;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author tadzotsa
 */
@Entity
@Table(name = "ROLES")
public class Role implements Serializable {

    private static final long serialVersionUID = 8569104842011545384L;

    @Id
    @Column(name = "ROLE")
    private String role;
    @Column(name = "DESCRIPTION")
    private String description;

    public Role() {
    }

    public Role(String name, String description) {
        this.role = name;
        this.description = description;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "{" + "\"role\":\"" + role + "\",\"description\":\"" + description + "\"}";
    }

}
