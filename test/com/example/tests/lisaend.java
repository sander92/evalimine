package com.example.tests;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

public class lisaend {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome", "http://sths2.netivalimised.appspot.com/");
		selenium.start();
	}

	@Test
	public void testLisaend() throws Exception {
		selenium.open("/Evalimised.html");
		selenium.waitForPageToLoad("");
		selenium.click("id=loginupp");
		selenium.open("https://www.facebook.com/login.php?api_key=404187206346181&skip_api_login=1&display=popup&cancel_url=http%3A%2F%2Fstatic.ak.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D24%23cb%3Df12d6c5110db626%26origin%3Dhttp%253A%252F%252Fsths2.netivalimised.appspot.com%252Ff1a758061128502%26domain%3Dsths2.netivalimised.appspot.com%26relation%3Dopener%26frame%3Df19b9fc883c7874%26error_reason%3Duser_denied%26error%3Daccess_denied%26error_description%3DThe%2Buser%2Bdenied%2Byour%2Brequest.&fbconnect=1&next=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Fpermissions.request%3F_path%3Dpermissions.request%26app_id%3D404187206346181%26client_id%3D404187206346181%26redirect_uri%3Dhttp%253A%252F%252Fstatic.ak.facebook.com%252Fconnect%252Fxd_arbiter.php%253Fversion%253D24%2523cb%253Df12d6c5110db626%2526origin%253Dhttp%25253A%25252F%25252Fsths2.netivalimised.appspot.com%25252Ff1a758061128502%2526domain%253Dsths2.netivalimised.appspot.com%2526relation%253Dopener%2526frame%253Df19b9fc883c7874%26sdk%3Djoey%26display%3Dpopup%26response_type%3Dtoken%252Csigned_request%26domain%3Dsths2.netivalimised.appspot.com%26fbconnect%3D1%26origin%3D1%26from_login%3D1&rcount=1");
		selenium.waitForPageToLoad("");
		selenium.type("id=email", "ellie.mination");
		selenium.type("id=pass", "kalamees");
		selenium.click("id=persist_box");
		selenium.click("id=u_0_1");
		selenium.waitForPageToLoad("30000");
		selenium.open("/Evalimised.html");
		selenium.click("link=Minu andmed");
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isTextPresent("Lisa enda")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		selenium.click("xpath=id('nupp')");
		selenium.open("/LisaKandidaadiks.html");
		selenium.waitForPageToLoad("");
		assertEquals("", selenium.getAlert());
		assertEquals("", selenium.getAlert());
		selenium.type("xpath=id('firstName')", "Shadow");
		selenium.type("xpath=id('lastName')", "Person");
		selenium.select("id=regionSelector", "label=Tartumaa");
		selenium.select("id=partySelector", "label=Keskerakond");
		selenium.click("id=submit");
		selenium.waitForPageToLoad("30000");
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isTextPresent("Olete andmebaasi lisatud")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		selenium.open("/Evalimised.html");
		selenium.click("id=loginupp");
		selenium.chooseOkOnNextConfirmation();
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
