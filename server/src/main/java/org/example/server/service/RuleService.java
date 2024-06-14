package org.example.server.service;

import lombok.RequiredArgsConstructor;
import org.example.server.dto.AddRuleDTO;
import org.example.server.dto.PageDTO;
import org.example.server.dto.RuleDTO;
import org.example.server.entity.Rule;
import org.example.server.mapper.RuleMapper;
import org.example.server.repository.RuleRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
public class RuleService {
    private final RuleRepository ruleRepository;
    private final RuleMapper ruleMapper;

    public boolean addRule(AddRuleDTO addRuleDTO) {
        Rule rule = ruleMapper.toEntity(addRuleDTO);
        ruleRepository.insert(rule);

        return true;
    }

    public PageDTO<RuleDTO> getRules(int limit) {
        List<Rule> rules = ruleRepository.getListByTimestamp(limit);
        return new PageDTO<>(ruleMapper.toDTOList(rules), ruleRepository.count());
    }

    public PageDTO<RuleDTO> getRules(Long lastKey, int limit, String option) {
        List<Rule> rules = null;
        if("prev".equals(option)) {
            rules = ruleRepository.getListByTimestampLessThan(new Timestamp(lastKey), limit);
            Collections.reverse(rules);
        } else {
            rules = ruleRepository.getListByTimestampGreaterThan(new Timestamp(lastKey), limit);
        }
        return new PageDTO<>(ruleMapper.toDTOList(rules), ruleRepository.count());
    }
}
