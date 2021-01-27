/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.cast.avaliacao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.com.cast.avaliacao.service.CategoriaService;
import br.com.cast.avaliacao.model.Categoria;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
@RequestMapping({"/categorias"})
public class CategoriaController {

    @Autowired
    private CategoriaService service;

    @GetMapping("/all/")
    public List<Categoria> getList(HttpServletResponse response) {
        return service.listAll();
    }

    @DeleteMapping("/delete/{id}")
    public String delete(HttpServletResponse response, @PathVariable Long id) {
        service.delete(id);
        return "OK";
    }

    @PutMapping("/put/")
    public String put(@RequestBody Categoria categoria) {
        service.put(categoria);
        return "OK";
    }

    @PostMapping("/save/")
    public Categoria post(HttpServletResponse response, @RequestBody Categoria categoria) {
        return service.save(categoria);
    }
}
