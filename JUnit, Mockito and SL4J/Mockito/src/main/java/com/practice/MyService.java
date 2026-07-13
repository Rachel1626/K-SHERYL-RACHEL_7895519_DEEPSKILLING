package com.practice;

public class MyService {

    private ExternalApi api;

    public MyService(ExternalApi api) {
        this.api = api;
    }

    public String fetchData() {
        return api.getData();
    }
    public String fetchUser(String name) {
        return api.getUser(name);
    }
    public void removeUser(String name) {
        api.deleteUser(name);
    }
}