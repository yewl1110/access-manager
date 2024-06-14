package org.example.server.dto;

public record GetRuleParamDTO(
        Integer limit,
        Long lastKey,
        String searchMemo,
        Period searchPeriod
) {}

