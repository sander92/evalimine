package evalimised;
import com.google.appengine.api.rdbms.AppEngineDriver;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


public class delVote extends HttpServlet{

	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		
	  PrintWriter out = resp.getWriter();
	  Connection c = null;
	    try {
	      DriverManager.registerDriver(new AppEngineDriver());
	      c = DriverManager.getConnection("jdbc:google:rdbms://netivalimised2013:netivalimised/evalimised");//, "root", "");
	      
	      String voterID = req.getParameter("voterID");
	      System.out.println(voterID);
    	  String statement = createQuery(voterID);
    	  PreparedStatement stmt = c.prepareStatement(statement);
	      int r = stmt.executeUpdate();
	      
	    } 
	    catch (SQLException e) {
	        e.printStackTrace();
	    } 
	    finally {
	        if (c != null){
	        	try {
					c.close();
				} 
	        	catch (SQLException ignore) {}
	        }
	    } 
	    //resp.setHeader("Refresh","3; url=/evalimised.jsp");
	  }
	
	private static String createQuery(String voterID) {
//		String kogu="update users set VotedForID=0 where UserName='"+voterID+"'";
		String kogu="delete from Vote where voterID='"+voterID+"'";

		String query = kogu;
		System.out.println(query);
		return query;
	}
    
}

