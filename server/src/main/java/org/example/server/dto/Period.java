package org.example.server.dto;

import java.time.LocalDateTime;

public record Period(
        LocalDateTime start,
        LocalDateTime end
) {
}
