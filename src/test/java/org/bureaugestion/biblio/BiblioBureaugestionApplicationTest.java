package org.bureaugestion.biblio;

import org.junit.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 *
 * @author hyacinthe
 */
public class BiblioBureaugestionApplicationTest {

    public BiblioBureaugestionApplicationTest() {
    }

    /**
     * Test of main method, of class BiblioBureaugestionApplication.
     */
    @Test
    public void hashPassord() {
        String password = "";
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println("HASH\u00C9 DE " + password + " : " + passwordEncoder.encode(password));
    }

}
