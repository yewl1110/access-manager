package org.example.server.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import org.example.server.validator.NullOrPositive;
import org.example.server.validator.ValidPeriod;

public record GetRuleParamDTO(
        @Positive @Max(50)
        Integer limit,
        @NullOrPositive
        Long lastKey,
        @Size(max = 20)
        String searchMemo,
        @ValidPeriod(nullable = true)
        Period searchPeriod
) {}

