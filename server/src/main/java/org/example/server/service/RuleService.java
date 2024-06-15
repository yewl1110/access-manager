package org.example.server.service;

import lombok.RequiredArgsConstructor;
import org.example.server.dto.AddRuleDTO;
import org.example.server.dto.GetRuleParamDTO;
import org.example.server.dto.PageDTO;
import org.example.server.dto.RuleDTO;
import org.example.server.entity.Rule;
import org.example.server.mapper.RuleMapper;
import org.example.server.repository.RuleRepository;
import org.springframework.stereotype.Service;

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

    public PageDTO<RuleDTO> getRules(GetRuleParamDTO param) {
        List<Rule> rules = ruleRepository.getListByTimestamp(param);
        return new PageDTO<>(ruleMapper.toDTOList(rules), ruleRepository.getCount(param));
    }

    public PageDTO<RuleDTO> getRules(GetRuleParamDTO param, String option) {
        List<Rule> rules = null;
        if("prev".equals(option)) {
            if(param.lastKey() != null) {
                rules = ruleRepository.getListByTimestampLessThan(param);
            } else {
                rules = ruleRepository.getListFirst10Data(param);
            }
            Collections.reverse(rules);
        } else {
            rules = ruleRepository.getListByTimestampGreaterThan(param);
        }
        return new PageDTO<>(ruleMapper.toDTOList(rules), ruleRepository.getCount(param));
    }
}
