package com.example.tests;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

public class otsiAllNames {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome", "http://sths2.netivalimised.appspot.com/");
		selenium.start();
	}

	@Test
	public void testOtsiAllNames() throws Exception {
		selenium.open("/");
		selenium.click("link=E-VALIMISED");
		selenium.waitForPageToLoad("30000");
		selenium.click("link=Kandidaadid");
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isTextPresent("kandidaati ots")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		selenium.click("id=otsi");
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
