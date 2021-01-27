
package br.com.cast.avaliacao.service;
 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import br.com.cast.avaliacao.repository.CursoRepository;
import br.com.cast.avaliacao.model.Curso;
 
@Service
@Transactional
public class CursoService {
 
    @Autowired
    private CursoRepository repo;
     
    public List<Curso> listAll() {
        return repo.findAll();
    }
     
    public Curso save(Curso curso) {
        return repo.save(curso);
    }
     
    public Curso get(long id) {
        return repo.findById(id).get();
    }
     
    public boolean put(Curso curso) {
        if(repo.existsById(curso.getId())){
            repo.save(curso);
            return true;
        }
        return false;
    }
     
    public void delete(long id) {
        repo.deleteById(id);
    }
}