package com.example.demo.controller;

import com.example.demo.entity.AddressBook;
import com.example.demo.exc.DuplicateAddressException;
import com.example.demo.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Validated
public class AddressController {

    @Autowired
    private AddressService service;

    @PutMapping("/addresses/{id}")
    public ResponseEntity<?> update(@RequestBody @Valid final AddressBook addressBook,@PathVariable final int id) {
        if (service.update(id, addressBook)) {
            return ResponseEntity.ok(addressBook);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/addresses/{id}")
    public ResponseEntity<?> delete(@PathVariable final int id){
       final boolean deleted = this.service.delete(id);
       if(deleted){
         return  ResponseEntity.noContent().build();
       } else{
          return ResponseEntity.badRequest()
                   .body(
                           Collections.singletonMap(
                                   "message",
                                   String.format("Address with id %d doesn't exist",id)
                           )
                   );
       }
    }

    @PostMapping("/addresses")
    public ResponseEntity<?> createAddress(@RequestBody @Valid final AddressBook addressBook){
        try {
            return ResponseEntity.ok(this.service.create(addressBook));
        }catch(DuplicateAddressException exc){
            return new ResponseEntity<>(exc.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/addresses/{id}")
    public ResponseEntity<AddressBook> getAddress(
					@PathVariable final int id
    ){
        AddressBook address = this.service.getAddressById(id);
        if(address == null){
            return ResponseEntity.notFound().build();
        } else{
            return ResponseEntity.ok(address);
        }
     }
    @GetMapping("/addresses")
    public ResponseEntity<List<AddressBook>> getAddress(
            @RequestParam(required = false) final String firstName,
            @RequestParam(required = false) final String lastName,
            @RequestParam(required = false) final String address
    ){
        if(firstName == null && lastName == null && address == null){
            return ResponseEntity.ok(this.service.getAll());
        } else{
            final List<AddressBook> books =  this.service.getAddresses(firstName,lastName,address);
            if(books.isEmpty()){
                return ResponseEntity.noContent().build();
            } else{
                return ResponseEntity.ok(books);
            }
        }

    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
