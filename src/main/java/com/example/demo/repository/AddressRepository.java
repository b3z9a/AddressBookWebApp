package com.example.demo.repository;

import com.example.demo.entity.AddressBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class AddressRepository {

    @Autowired
    private JdbcTemplate template;


    public AddressBook create(final AddressBook addressBook){
        final KeyHolder holder = new GeneratedKeyHolder();
        this.template.update(con -> {
            PreparedStatement preparedStatement = con.prepareStatement("insert into address (name,last_name,address) values (?,?,?);", Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, addressBook.getFirstName());
            preparedStatement.setString(2,addressBook.getFirstName());
            preparedStatement.setString(3, addressBook.getAddress());
            return preparedStatement;
        },holder);
        addressBook.setId(Integer.parseInt(holder.getKeys().get("id").toString()));

        return addressBook;
    }

    //"";delete from users;;
    @Transactional
    public AddressBook getAddressByFirstname(final String firstName){
       return  this.template.queryForObject(
                "SELECT * from address where name = ?;",
                        new Object[]{firstName},
                (resultSet, i) -> new AddressBook(
                        resultSet.getInt("id"),
                        resultSet.getString("name"),
                        resultSet.getString("last_name"),
                        resultSet.getString("address")
                )
        );
    }

    public boolean delete(int id) {
        return this.template.update("DELETE from address where id = ?",new Object[]{id})!=0;
    }

    public boolean update(int id, AddressBook addressBook) {
       return this.template.update(
                "UPDATE address set name=?,last_name=?,address=? where id = ?",
                new Object[]{addressBook.getFirstName(),addressBook.getLastName(),addressBook.getAddress(),id}
        )!=0;
    }

    public List<AddressBook> getAddresses(String firstName, String lastName, String address) {
        List<Map<String, Object>> rows = this.template.queryForList(
                "SELECT * from address where name like ? and last_name like ? and address like ? ",
                new Object[]{
                        firstName == null ? "%%" : "%" + firstName + "%",
                        lastName == null ? "%%" : "%" + lastName + "%",
                        address == null ? "%%" : "%" + address + "%",
                }
        );
       return rows.stream()
                .map(map->
                        new AddressBook(
                                Integer.parseInt(map.get("id").toString()),
                                map.get("name").toString(),
                                map.get("last_name").toString(),
                                map.get("address").toString()
                        )
                )
                .collect(Collectors.toList());

    }

    public List<AddressBook> getAll() {
        List<Map<String, Object>> rows = this.template.queryForList("SELECT * from address order by id desc; ");
        return rows.stream()
                .map(map->
                        new AddressBook(
                                Integer.parseInt(map.get("id").toString()),
                                map.get("name").toString(),
                                map.get("last_name").toString(),
                                map.get("address").toString()
                        )
                )
                .collect(Collectors.toList());
    }

    public AddressBook getById(int id) {
        return  this.template.queryForObject(
                "SELECT * from address where id = ? limit 1;",
                new Object[]{id},
                (resultSet, i) -> new AddressBook(
                        resultSet.getInt("id"),
                        resultSet.getString("name"),
                        resultSet.getString("last_name"),
                        resultSet.getString("address")
                )
        );
    }
}
