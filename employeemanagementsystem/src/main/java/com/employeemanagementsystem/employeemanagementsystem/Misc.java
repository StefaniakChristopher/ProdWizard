package com.employeemanagementsystem.employeemanagementsystem;

public class Misc {
    public static String stringParser(String stringToBeParsed) {
        String parsedString = stringToBeParsed.replace("\"", "");
        return parsedString;
    }
}
