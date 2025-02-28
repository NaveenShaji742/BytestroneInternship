package com.Project.project.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ProjectNotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(ProjectNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String,String> exceptionHandler(ProjectNotFoundException exception){
        Map<String,String> errorMap=new HashMap<>();
        errorMap.put("error message",exception.getMessage());
        return errorMap;
    }
}