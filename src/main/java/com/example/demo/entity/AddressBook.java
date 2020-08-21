package com.example.demo.entity;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class AddressBook {
    private int id;

    @NotBlank(message = "FirstName can't be null")
    @Size(min = 2,message = "First name length has to be higher than 2")
    private String firstName;

    @NotBlank(message = "Last name can't be null")
    @Size(min = 2,message = "Last name length has to be higher than 2")
    private String lastName;

    @NotBlank(message = "Address can't be null")
    private String address;

    public AddressBook(int id, String firstName, String lastName, String address) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
