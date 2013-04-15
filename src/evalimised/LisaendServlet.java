package evalimised;
import channel.StatisticsUpdater;

import com.google.appengine.api.rdbms.AppEngineDriver;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import javax.servlet.http.*;
import com.google.appengine.api.channel.ChannelService;

public class LisaendServlet extends HttpServlet{

		
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
	  String fName = req.getParameter("fName");
      String lName = req.getParameter("lName");
      String area = req.getParameter("area");
      String party = req.getParameter("party");
      
		resp.setContentType("text/html");

		PrintWriter out = resp.getWriter();

	  Connection c = null;
		out.print("<html><head><style>body{background-color:#fff999;font-size:16px;	}</style>	</head><body>");

	    try {
	    	
	      DriverManager.registerDriver(new AppEngineDriver());

	      c = DriverManager.getConnection("jdbc:google:rdbms://netivalimised2013:netivalimised/evalimised","root","");

    	  String statement = createQuery(fName,lName,party, area);
			
    	  PreparedStatement stmt = c.prepareStatement(statement);

	      int i=stmt.executeUpdate();

	      
	      StatisticsUpdater su = new StatisticsUpdater();
	      su.updateClients();
	      

		out.print("	Olete andmebaasi lisatud<br>Tere uus poliitik!");

		out.print("</body></html>");

		out.close();
      
	      
	      
	    } 
	    catch (SQLException e) {
	        e.printStackTrace();		
	        resp.getWriter().print("Tekkis viga...<br>Teid pole poliitikuks lisatud");

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
	
	private static String createQuery(String fname, String lname, String party, String area) {
		
		String algus = "Insert into Person(LastName,FirstName,PartyID,AreaID) values('";
		
		String pid="select Party_ID from Party where PartyName='"+party+"'";
		String arid="select Area_ID from Area where AreaName='"+area+"'";
		String end=lname+"', '"+fname+"', ("+pid+"),("+arid+"));";
		String query = algus + end;

		System.out.println(query);
		return query;
	}
	
	
    
}