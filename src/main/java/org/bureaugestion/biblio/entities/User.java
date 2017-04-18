package org.bureaugestion.biblio.entities;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

/**
 *
 * @author tadzotsa
 */
@Entity
@Table(name = "USERS")
public class User implements Serializable {

    private static final long serialVersionUID = -6844530513104120886L;

    @Id
    @Column(name = "USERNAME")
    private String username;
    @Column(name = "PASSWORD")
    @Basic(optional = false)
    private String password;
    @Column(name = "ACTIVATED")
    @Basic(optional = false)
    private Boolean activated = true;
    @Basic(optional = false)
    private String nickName;
    private String firstName;
    @Basic(optional = false)
    private String lastName;
    @Basic(optional = false)
    private String title;
    @Basic(optional = false)
    private Boolean gender;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "USERS_ROLES")
    private Collection<Role> roles;

    public User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(String username, String password, boolean activated) {
        this.username = username;
        this.password = password;
        this.activated = activated;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getActivated() {
        return activated;
    }

    public void setActivated(Boolean activated) {
        this.activated = activated;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isGender() {
        return gender;
    }

    public void setGender(boolean gender) {
        this.gender = gender;
    }

    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        String activatedString = "{}";
        if (activated != null) {
            activatedString = activated.toString();
        }
        String genderString = "{}";
        if (gender != null) {
            genderString = gender.toString();
        }
        String rolesString = "{}";
        if (roles != null) {
            rolesString = roles.toString();
        }
        return "{" + "\"username\":\"" + username + "\",\"password\":\"" + password + "\",\"activated\":" + activatedString + ",\"login\":\"" + nickName + "\",\"firstName\":\"" + firstName + "\",\"lastName\":\"" + lastName + "\",\"title\":\"" + title + "\",\"gender\":" + genderString + ",\"roles\":" + rolesString + "}";
    }

}
