package com.kenzie.appserver.example.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.io.File;

public class FrontendTest {

    @Test
    void checkCommentPage() {
        File file = new File("../Frontend/src/pages/commentPage.js");
        boolean exists = file.exists();
        Assertions.assertTrue(exists);
    }

    @Test
    void checkCommentClient() {
        File file = new File("../Frontend/src/pages/commentClient.js");
        boolean exists = file.exists();
        Assertions.assertTrue(exists);
    }

    @Test
    void checkCommentsHtml() {
        File file = new File("../Frontend/src/comments.html");
        boolean exists = file.exists();
        Assertions.assertTrue(exists);
    }
}