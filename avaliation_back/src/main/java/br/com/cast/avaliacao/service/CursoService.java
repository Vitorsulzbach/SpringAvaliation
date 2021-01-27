package br.com.cast.avaliacao.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import br.com.cast.avaliacao.repository.CursoRepository;
import br.com.cast.avaliacao.model.Curso;
import java.util.stream.Collectors;

@Service
@Transactional
public class CursoService {

    @Autowired
    private CursoRepository repo;

    public List<Curso> listAll() {
        return repo.findAll();
    }

    public Curso save(Curso curso) {
        if (curso.getInitDate() < curso.getEndDate()) {
            List<Curso> cursos = repo.findAll();
            List<Curso> cursosInBetween = cursos.stream()
                    .filter(cursoFinded -> !(((cursoFinded.getEndDate() < curso.getEndDate()) && (cursoFinded.getEndDate() < curso.getInitDate())) || ((cursoFinded.getInitDate() > curso.getEndDate()) && (cursoFinded.getInitDate() > curso.getInitDate()))))
                    .collect(Collectors.toList());
            if (cursosInBetween.isEmpty()) {
                return repo.save(curso);
            }
        }
        throw new Error("datas conflitantes!");
    }

    public Curso get(long id) {
        return repo.findById(id).get();
    }

    public boolean put(Curso curso) {
        if (repo.existsById(curso.getId())) {
            repo.save(curso);
            return true;
        }
        return false;
    }

    public void delete(long id) {
        repo.deleteById(id);
    }
}
