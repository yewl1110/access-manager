package org.example.server.service;

import lombok.RequiredArgsConstructor;
import org.example.server.dto.*;
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

    public ResultDTO addRule(AddRuleDTO addRuleDTO) {
        long count = ruleRepository.count();
        ResultDTO result;
        if(count < 50) {
            Rule rule = ruleMapper.toEntity(addRuleDTO);
            ruleRepository.insert(rule);
            result = ResultDTO.builder().success(true).build();
        } else {
            result = ResultDTO.builder().success(false).message("규칙은 50개까지만 넣을 수 있습니다.").build();
        }

        return result;
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

    public boolean removeRule(Long ruleId) {
        ruleRepository.deleteById(ruleId);
        return true;
    }
}
