package br.com.cast.avaliacao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.com.cast.avaliacao.model.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
}