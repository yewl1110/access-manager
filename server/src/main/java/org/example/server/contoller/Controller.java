package org.example.server.contoller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.server.dto.AddRuleDTO;
import org.example.server.dto.GetRuleParamDTO;
import org.example.server.dto.ResultDTO;
import org.example.server.service.ClientService;
import org.example.server.service.RuleService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping
public class Controller {
    private final ClientService clientService;
    private final RuleService ruleService;

    @GetMapping(value = "/ip", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> getIP(HttpServletRequest request) {
        return ResponseEntity.ok().body(clientService.getUserIP(request));
    }

    @PostMapping("/access-rule")
    public ResponseEntity<?> addRule(@Valid @RequestBody AddRuleDTO param) {
        return ResponseEntity.ok().body(ResultDTO.builder().success(ruleService.addRule(param)).build());
    }

    @PostMapping(value = "/access-rule/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getRule(@Valid @RequestBody GetRuleParamDTO param) {
        return ResponseEntity.ok().body(ruleService.getRules(param));
    }

    @PostMapping(value = "/access-rule/list/{option:prev|next}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getRule(@Valid @RequestBody GetRuleParamDTO param, @PathVariable("option") String option) {
        return ResponseEntity.ok().body(ruleService.getRules(param, option));
    }

    @DeleteMapping(value = "/access-rule/{rule-id:\\d+}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> removeRule(@PathVariable("rule-id") Long ruleId) {
        return ResponseEntity.ok().body(ResultDTO.builder().success(ruleService.removeRule(ruleId)).build());
    }
}
