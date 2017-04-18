package org.bureaugestion.biblio.repositories;

import org.bureaugestion.biblio.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author hyacinthe
 */
public interface UserRepository extends JpaRepository<User, String> {

}
