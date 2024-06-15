package org.example.server.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.example.server.dto.Period;

public class PeriodValidator implements ConstraintValidator<ValidPeriod, Period> {
    private ValidPeriod annotation;


    @Override
    public void initialize(ValidPeriod constraintAnnotation) {
        this.annotation = constraintAnnotation;
    }

    @Override
    public boolean isValid(Period period, ConstraintValidatorContext constraintValidatorContext) {
        boolean result = false;
        if(!this.annotation.nullable()) {
            result = period != null && period.start() != null && period.end() != null;
            result = result && period.start().isBefore(period.end());
        } else {
            result = period == null || period.start() == null && period.end() == null;
            if (!result) {
                if( period.start() != null) {
                    if (period.end() != null) {
                        result = period.start().isBefore(period.end());
                    } else {
                        result = true;
                    }
                }
            }
        }

        return result;
    }
}
