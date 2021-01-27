/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.cast.avaliacao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.com.cast.avaliacao.service.ContactService;
import org.springframework.web.bind.annotation.PostMapping;
import br.com.cast.avaliacao.model.Contact;
import java.util.List;
import org.springframework.ui.Model;

@RestController
@RequestMapping({"/contacts"})
public class ContactController {

    @Autowired
    private ContactService service;

    @PostMapping("/")
    public String viewHomePage(Model model) {
        List<Contact> listContacts = service.listAll();
        model.addAttribute("listProducts", listContacts);
        return "index";
    }
}
