package com.example.demo.service;

import com.example.demo.entity.AddressBook;
import com.example.demo.exc.DuplicateAddressException;
import com.example.demo.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    @Autowired
    private AddressRepository repository;

    public AddressBook create(final AddressBook addressBook){
        try {
            return this.repository.create(addressBook);
        }catch (final Exception exc){
            throw new DuplicateAddressException(exc);
        }
    }

    public AddressBook getBookByFirstName(final String firstName){
        try {
            return this.repository.getAddressByFirstname(firstName);
        }catch(DataAccessException exc){
            return null;
        }
    }

    public boolean delete(int id) {
        return this.repository.delete(id);
    }

    public boolean update(int id, AddressBook addressBook) {
        return this.repository.update(id,addressBook);
    }

    public List<AddressBook> getAddresses(String firstName, String lastName, String address) {
        return this.repository.getAddresses(firstName,lastName,address);
    }

    public List<AddressBook> getAll() {
        return this.repository.getAll();
    }

    public AddressBook getAddressById(int id) {
        try {
            return this.repository.getById(id);
        }catch (final DataAccessException exc){
            return null;
        }
    }
}
