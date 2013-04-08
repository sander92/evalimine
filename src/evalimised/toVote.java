package evalimised;
import com.google.appengine.api.rdbms.AppEngineDriver;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

import javax.servlet.http.*;


public class toVote extends HttpServlet{

		
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
	  String voterID = req.getParameter("voterID");
      String candName = req.getParameter("candidateName");
      String candParty = req.getParameter("candidateParty");
      String candArea = req.getParameter("candidateArea");

		resp.setContentType("text/html");

		PrintWriter out = resp.getWriter();

	  Connection c = null;
		//out.print("<html><head><style>body{background-color:#fff999;font-size:16px;	}</style>	</head><body>");
	  ResultSet rs = null;
	    try {
	    	
			DriverManager.registerDriver(new AppEngineDriver());
			
			c = DriverManager.getConnection("jdbc:google:rdbms://netivalimised2013:netivalimised/evalimised","root","");
			
			String statement = createQuery(voterID,candName, candArea, candParty);
				
			PreparedStatement stmt = c.prepareStatement(statement);
			
			rs = stmt.executeQuery();
			rs.next();
			String a=rs.getString("haal");
			if(a.trim().equals("1") || a.trim().equals("1")){
				out.print(candName);
			}
			else{
				out.print("ei");
			}
			out.close();
      
	      
	    } 
	    catch (SQLException e) {
	        e.printStackTrace();	
	        resp.getWriter().print("prob");

			
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
	
	private static String createQuery(String voterID, String candName,String candArea,String candParty) {
		
//		
//		String pid="select Party_ID from Party where PartyName='"+candParty+"'";
//		String arid="select Area_ID from Area where AreaName='"+candArea+"'";
//		
//		String algus = "SELECT Person_Id FROM Person where (SELECT CONCAT_WS(' ',firstname, lastname) )='"+candName+"' and PartyID='"+pid+"' and AreaId='"+arid+"'";

//		String query = algus + end;

//		System.out.println(query);
		
		String query="select voting('"+candName+"','"+candParty+"', '"+candArea+"','"+voterID+"') as haal";
		
		return query;
	}
	
	
	
	
    
}