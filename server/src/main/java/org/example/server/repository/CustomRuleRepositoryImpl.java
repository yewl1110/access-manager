package org.example.server.repository;

import lombok.RequiredArgsConstructor;
import org.example.server.dto.GetRuleParamDTO;
import org.example.server.dto.Period;
import org.example.server.entity.Rule;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.util.StringUtils;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RequiredArgsConstructor
public class CustomRuleRepositoryImpl implements CustomRuleRepository {
    private final JdbcClient jdbcClient;

    private void setFilter(StringBuilder sb, Map<String, Object> paramMap, GetRuleParamDTO paramDTO) {
        if(StringUtils.hasText(paramDTO.searchMemo())) {
            sb.append("and memo LIKE :memo ");
            paramMap.put("memo", paramDTO.searchMemo()+"%");
        }
        Period period = paramDTO.searchPeriod();
        if(period != null) {
            Optional.ofNullable(period.start()).ifPresent(start -> {
                sb.append("and start_date >= :start ");
                paramMap.put("start", start);
            });
            Optional.ofNullable(period.end()).ifPresent(end -> {
                sb.append("and end_date <= :end ");
                paramMap.put("end", end);
            });
        }
    }

    @Override
    public long getCount(GetRuleParamDTO paramDTO) {
        Map<String, Object> paramMap = new HashMap<>();
        StringBuilder countQuery = new StringBuilder();
        countQuery.append("select count(*) from rule where 1=1 ");
        setFilter(countQuery, paramMap, paramDTO);
        Long count = jdbcClient.sql(countQuery.toString()).params(paramMap).query(Long.class).single();
        return count;
    }

    @Override
    public List<Rule> getListByTimestampGreaterThan(GetRuleParamDTO param) {
        Map<String, Object> paramMap = new HashMap<>();
        StringBuilder sb = new StringBuilder();
        sb.append("select * from rule where created < :timestamp ");
        setFilter(sb, paramMap, param);
        sb.append("order by created desc limit :limit");
        paramMap.put("timestamp", new Timestamp(param.lastKey()));
        paramMap.put("limit", param.limit());
        List<Rule> rules = jdbcClient.sql(sb.toString()).params(paramMap).query(Rule.class).list();

        return rules;
    };

    @Override
    public List<Rule> getListByTimestampLessThan(GetRuleParamDTO param) {
        Map<String, Object> paramMap = new HashMap<>();
        StringBuilder sb = new StringBuilder();
        sb.append("select * from rule where created > :timestamp ");
        setFilter(sb, paramMap, param);
        sb.append("order by created desc limit :limit");
        paramMap.put("timestamp", new Timestamp(param.lastKey()));
        paramMap.put("limit", param.limit());
        List<Rule> rules = jdbcClient.sql(sb.toString()).params(paramMap).query(Rule.class).list();

        return rules;
    };

    @Override
    public List<Rule> getListByTimestamp(GetRuleParamDTO param) {
        Map<String, Object> paramMap = new HashMap<>();
        StringBuilder sb = new StringBuilder();
        sb.append("select * from rule where 1=1 ");
        setFilter(sb, paramMap, param);
        sb.append("order by created desc limit :limit");
        paramMap.put("limit", param.limit());
        List<Rule> rules = jdbcClient.sql(sb.toString()).params(paramMap).query(Rule.class).list();

        return rules;
    };
}
