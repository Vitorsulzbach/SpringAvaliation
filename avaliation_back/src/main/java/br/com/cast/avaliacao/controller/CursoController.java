
package br.com.cast.avaliacao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.com.cast.avaliacao.service.CursoService;
import br.com.cast.avaliacao.model.Curso;
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
@RequestMapping({"/cursos"})
public class CursoController {

    @Autowired
    private CursoService service;

    @GetMapping("/all/")
    public List<Curso> getList(HttpServletResponse response) {
        return service.listAll();
    }

    @DeleteMapping("/delete/{id}")
    public String delete(HttpServletResponse response, @PathVariable Long id) {
        service.delete(id);
        return "OK";
    }

    @PutMapping("/put/")
    public String put(@RequestBody Curso curo) {
        service.put(curo);
        return "OK";
    }

    @PostMapping("/save/")
    public Curso post(HttpServletResponse response, @RequestBody Curso curso) {
        return service.save(curso);
    }
}
