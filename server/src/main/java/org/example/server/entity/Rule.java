package org.example.server.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
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
    private Timestamp created;

    @Builder
    public Rule(String ip, String memo, LocalDateTime startDate, LocalDateTime endDate) {
        this.ip = ip;
        this.memo = memo;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
