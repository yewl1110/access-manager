package org.example.server.mapper;

import org.example.server.dto.AddRuleDTO;
import org.example.server.dto.RuleDTO;
import org.example.server.entity.Rule;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Component;

import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public abstract class RuleMapper {
    protected final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssz").withZone(ZoneOffset.UTC);
    @Mapping(target="startDate", source="source.period.start")
    @Mapping(target="endDate", source="source.period.end")
    public abstract Rule toEntity(AddRuleDTO source);

    @Mapping(target="period.start", expression = "java(formatter.format(rule.getStartDate()))")
    @Mapping(target="period.end", expression = "java(formatter.format(rule.getEndDate()))")
    @Mapping(target="key", expression = "java(rule.getCreated().getTime())")
    public abstract RuleDTO toDTO(Rule rule);
    public abstract List<RuleDTO> toDTOList(List<Rule> list);
}
