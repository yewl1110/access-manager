package org.example.server.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.example.server.validator.ValidPeriod;

public record AddRuleDTO(
        @NotBlank @Size(max=15)
        String ip,
        @NotBlank @Size(max=20)
        String memo,
        @ValidPeriod
        Period period
) {
}
