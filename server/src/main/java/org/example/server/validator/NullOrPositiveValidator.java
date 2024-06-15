package org.example.server.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.example.server.dto.Period;

public class NullOrPositiveValidator implements ConstraintValidator<NullOrPositive, Number> {
    private NullOrPositive annotation;


    @Override
    public void initialize(NullOrPositive constraintAnnotation) {
        this.annotation = constraintAnnotation;
    }

    @Override
    public boolean isValid(Number value, ConstraintValidatorContext constraintValidatorContext) {
        return value == null || value.intValue() > 0;
    }
}
