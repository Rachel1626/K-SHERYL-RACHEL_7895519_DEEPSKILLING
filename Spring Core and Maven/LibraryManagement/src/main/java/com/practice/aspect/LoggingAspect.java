package com.practice.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    @Before("execution(* com.practice.BookService.*(..))")
    public void beforeMethod(JoinPoint joinPoint) {

        System.out.println("Before Method: "
                + joinPoint.getSignature().getName());

    }

    @After("execution(* com.practice.BookService.*(..))")
    public void afterMethod(JoinPoint joinPoint) {

        System.out.println("After Method: "
                + joinPoint.getSignature().getName());

    }

}