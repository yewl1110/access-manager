package org.example.server.dto;

public record RuleDTO (
        Long id,
        String ip,
        String memo,
        String start,
        String end,
        Long key
) {}
