package org.example.server.dto;

import java.util.List;

public record PageDTO<T> (
        List<T> data,
        long count
){
}
