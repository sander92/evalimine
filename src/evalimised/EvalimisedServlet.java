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


public class EvalimisedServlet extends HttpServlet{

	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		Enumeration en = req.getParameterNames();
	      while (en.hasMoreElements()){
	          System.out.println(en.nextElement()); 
	       }
	  System.out.println();
	  PrintWriter out = resp.getWriter();
	  Connection c = null;
	    try {
	      DriverManager.registerDriver(new AppEngineDriver());
	      c = DriverManager.getConnection("jdbc:google:rdbms://netivalimised2013:netivalimised/evalimised");
	     // String fName = req.getParameter("firstName");
	      //String lName = req.getParameter("lastName");
	      //String party = req.getParameter("party");
	      //String area = req.getParameter("area");
		  String fName = "";
	      String lName = "Lehm";
	      String party = "";
	      String area = "";
	      if(fName != "" || lName !="") {
	    	  String statement = createQuery(fName,lName,party, area);
	    	  PreparedStatement stmt = c.prepareStatement(statement);
		      ResultSet rs = stmt.executeQuery();
		      List<Candidate> candidates = new ArrayList<Candidate>();
		      while(rs.next()){
	                Candidate candidate = new Candidate();
	                candidate.setFName(rs.getString("FirstName"));
	                candidate.setLName(rs.getString("LastName"));
	                candidate.setParty(rs.getString("Party"));
	                candidate.setArea(rs.getString("Area"));
	                candidates.add(candidate);
		      }

		      Gson gson = new GsonBuilder().create();
	          String categoriesJson = gson.toJson(candidates);
	          resp.setContentType("application/json");
	          resp.setCharacterEncoding("UTF-8");
	          //resp.getWriter().write(categoriesJson);
	      }
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
	
	private static String createQuery(String fname, String lname, String area, String party) {
		String beginning = "SELECT Person.FirstName AS 'FirstName', Person.LastName AS 'LastName'";
		String middle = "";
		String end = "WHERE ";
		
		if(fname!="")
			end += "FirstName=\""+fname+"\" AND ";	
		if(lname!="")
			end += "LastName=\""+lname+"\" AND ";
		if(party!="") {
			beginning += ", Area.AreaName AS 'Area'";
			middle += "JOIN Party ON Person.PartyID = Party.Party_Id ";
			end += "PartyID=\""+party+"\" AND ";
		}
		if(area!="") {
			beginning += ", Party.PartyName AS 'Party'";
			middle += "JOIN Area ON Person.AreaID = Area.Area_Id ";
			end += "AreaID=\""+area+"\" AND ";
		}
		if(party=="" && area==""){
			beginning += ", Area.AreaName AS 'Area'";
			beginning += ", Party.PartyName AS 'Party'";
			middle += "JOIN Party ON Person.PartyID = Party.Party_Id ";
			middle += "JOIN Area ON Person.AreaID = Area.Area_Id ";
		}
		//remove last " AND "
		end = end.substring(0, end.length() - 5);
		beginning +=" FROM Person ";
		String query = beginning + middle + end;
		System.out.println(query);
		return query;
	}
    
}

