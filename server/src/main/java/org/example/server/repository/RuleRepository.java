package org.example.server.repository;

import org.example.server.entity.Rule;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface RuleRepository extends CrudRepository<Rule, Long>, CustomRuleRepository {
    @Modifying
    @Query("insert into rule(ip, memo, start_date, end_date) values (:#{#param.ip}, :#{#param.memo}, :#{#param.startDate}, :#{#param.endDate})")
    Integer insert(@Param("param") Rule rule);
}