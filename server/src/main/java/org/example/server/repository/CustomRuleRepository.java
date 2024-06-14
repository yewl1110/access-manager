package org.example.server.repository;

import org.example.server.dto.GetRuleParamDTO;
import org.example.server.entity.Rule;

import java.util.List;

public interface CustomRuleRepository {
    List<Rule> getListByTimestampGreaterThan(GetRuleParamDTO param);
    List<Rule> getListByTimestampLessThan(GetRuleParamDTO param);
    List<Rule> getListByTimestamp(GetRuleParamDTO param);
    long getCount(GetRuleParamDTO paramDTO);
}
