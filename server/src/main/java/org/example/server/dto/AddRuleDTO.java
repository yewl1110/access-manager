package org.example.server.dto;

public record AddRuleDTO(
        String ip,
        String memo,
        Period period
) {
}
