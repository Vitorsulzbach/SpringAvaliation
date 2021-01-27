
package br.com.cast.avaliacao.service;
 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import br.com.cast.avaliacao.repository.CategoriaRepository;
import br.com.cast.avaliacao.model.Categoria;
 
@Service
@Transactional
public class CategoriaService {
 
    @Autowired
    private CategoriaRepository repo;
     
    public List<Categoria> listAll() {
        return repo.findAll();
    }
     
    public Categoria save(Categoria categoria) {
        return repo.save(categoria);
    }
     
    public Categoria get(long id) {
        return repo.findById(id).get();
    }
     
    public boolean put(Categoria categoria) {
        if(repo.existsById(categoria.getId())){
            repo.save(categoria);
            return true;
        }
        return false;
    }
     
    public void delete(long id) {
        repo.deleteById(id);
    }
}