package com.practice;

import java.util.Optional;

public interface UserRepository {

    Optional<User> findById(Long id);

}