package org.example.server.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table
public class Rule {
    @Id @Column("rule_id")
    private Long id;
    private String ip;
    private String memo;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

}
