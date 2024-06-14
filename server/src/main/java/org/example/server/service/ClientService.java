package org.example.server.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

@Service
public class ClientService {
    public String getUserIP(HttpServletRequest request) {
        String[] headerTypes = {"X-Forwarded-For", "Proxy-Client-IP", "WL-Proxy-Client-IP", "HTTP_CLIENT_IP", "HTTP_X_FORWARDED_FOR"};
        String ip = null;
        for(String headerType: headerTypes) {
            ip = request.getHeader(headerType);
            if(ip != null) break;
        }
        if (ip == null) ip = request.getRemoteAddr();
        return ip;
    }
}
