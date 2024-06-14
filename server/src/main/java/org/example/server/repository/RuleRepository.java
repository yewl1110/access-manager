package org.example.server.repository;

import org.example.server.entity.Rule;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

public interface RuleRepository extends CrudRepository<Rule, Long> {
    @Modifying
    @Query("insert into rule(ip, memo, start_date, end_date) values (:#{#param.ip}, :#{#param.memo}, :#{#param.startDate}, :#{#param.endDate})")
    Integer insert(@Param("param") Rule rule);

    @Query("select * from rule where created < :timestamp order by created desc limit :limit")
    List<Rule> getListByTimestampGreaterThan(@Param("timestamp") Timestamp timestamp, @Param("limit") int limit);
    @Query("select * from rule where created > :timestamp order by created limit :limit")
    List<Rule> getListByTimestampLessThan(@Param("timestamp") Timestamp timestamp, @Param("limit") int limit);
    @Query("select * from rule order by created desc limit :limit")
    List<Rule> getListByTimestamp(@Param("limit") int limit);
}