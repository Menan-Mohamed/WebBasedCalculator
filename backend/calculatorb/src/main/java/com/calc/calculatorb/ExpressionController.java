package com.calc.calculatorb;

import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExpressionController {

    @PostMapping("/evaluate")
    public ResponseEntity<?> evaluateExpression(@RequestBody ExpressionRequest request) {
        System.out.println(request);
        String expressionStr = request.getExpression();
        try {
            Expression expression = new ExpressionBuilder(expressionStr).build();
            double result = expression.evaluate();
            return ResponseEntity.ok(result);
        } catch (ArithmeticException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Arithmetic error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error evaluating expression: " + e.getMessage());
        }
    }
}
