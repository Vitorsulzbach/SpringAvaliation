/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.cast.avaliacao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import br.com.cast.avaliacao.model.Cliente;

@RepositoryRestResource(collectionResourceRel = "cliente", path = "clientes")
public interface ClienteRepository extends PagingAndSortingRepository<Cliente, Long> {

      /**
       * Método que retorna uma lista de clientes fazendo a busca pelo nome
       passado como parâmetro.
       *
       * @param name
       * @return lista de clientes
       */
      List<Cliente> findByNome(@Param("name") String name);

      /**
       * Método que retorna o cliente com apenas seu nome fazendo a busca
       com o id passado como parâmetro.
       *
       * @param id
       * @return cliente do id passado como parâmetro.
       */
      @Query("SELECT c.nome FROM Cliente c where c.id = :id")
    Cliente findNomeById(@Param("id") Long id);

      /**
       * Método que retorna uma lista de clientes fazendo a busca pelo nome passado
       como parâmetro e ordenando os
       * clientes pelo nome.
       *
       * @param name
       * @return lista de clientes
       */
      List<Cliente> findByNomeOrderByNome(@Param("name") String name);

}