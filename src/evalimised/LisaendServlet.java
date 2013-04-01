package evalimised;
import com.google.appengine.api.rdbms.AppEngineDriver;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


public class LisaendServlet extends HttpServlet{

		
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
	  String fName = req.getParameter("fName");
      String lName = req.getParameter("lName");
      String party = req.getParameter("party");
      String area = req.getParameter("area");
      
	  PrintWriter out = resp.getWriter();

	  Connection c = null;
	    try {
	      DriverManager.registerDriver(new AppEngineDriver());
	      c = DriverManager.getConnection("jdbc:google:rdbms://netivalimised2013:netivalimised/evalimised");

    	  String statement = createQuery(fName,lName,party, area);
    	  PreparedStatement stmt = c.prepareStatement(statement);
	      stmt.executeUpdate();
	      out.write("Olete süsteemi kirjutatud");

	    } 
	    catch (SQLException e) {
	        e.printStackTrace();
	    } 
	    finally {
	        if (c != null){
	        	try {
					c.close();
					out.close();
				} 
	        	catch (SQLException ignore) {}
	        }
	    } 
	    //resp.setHeader("Refresh","3; url=/evalimised.jsp");
	  }
	
	private static String createQuery(String fname, String lname, String party, String area) {
		
		String algus = "Insert into Person(LastName,FirstName,PartyID,AreaID) values(";
		
		String pid="select Party_ID from Party where PartyName='"+party+"'";
		String arid="select Area_ID from Area where AreaName='"+area+"'";
		String end=lname+", "+fname+", ("+pid+"),("+arid+"));";
		String query = algus + end;

		System.out.println(query);
		return query;
	}
	
	
    
}

