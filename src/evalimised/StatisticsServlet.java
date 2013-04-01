package evalimised;
import com.google.appengine.api.rdbms.AppEngineDriver;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


public class StatisticsServlet extends HttpServlet{

		
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		
      String option = req.getParameter("option");
	  Connection c = null;
	    try {
	      DriverManager.registerDriver(new AppEngineDriver());
	      c = DriverManager.getConnection("jdbc:google:rdbms://netivalimised2013:netivalimised/evalimised");

	      if(option!= null || option != "") {
	    	  String statement = createQuery(option);
	    	  PreparedStatement stmt = c.prepareStatement(statement);
		      ResultSet rs = stmt.executeQuery();
		      String jsonData = createJSON(rs, option);
	          resp.setContentType("application/json");
	          resp.setCharacterEncoding("UTF-8");
	          resp.getWriter().write(jsonData);
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
	  }
	
	private static String createQuery(String option) {
		String query = "";
		int i;
		if(option == "region")
			query ="SELECT Area.AreaName, COUNT(Vote.Vote_Id) FROM Vote " +
					"JOIN Person ON Vote.PersonID = Person.Person_Id JOIN Area ON Person.AreaID=Area.Area_Id GROUP BY AreaID";
		else if(option == "party")
			query ="SELECT Party.PartyName, COUNT(Vote.Vote_Id) FROM Vote " +
					"JOIN Person ON Vote.PersonID = Person.Person_Id JOIN Party ON Person.PartyID=Party.Party_Id GROUP BY PartyID";
		else if(option == "candidate")
			query = "SELECT Person.FirstName, Person.LastName, Area.AreaName, Party.PartyName, COUNT(Vote.Vote_Id) FROM Vote " +
					"JOIN Person ON Vote.PersonID = Person.Person_Id JOIN Party ON Person.PartyID=Party.Party_Id " +
					"JOIN Area ON Person.AreaID=Area.Area_Id GROUP BY PersonID";	
		return query;
	}
	
	private static String createJSON(ResultSet rs, String option){
	      List<VoteData> data = new ArrayList<VoteData>();
	      try {
			while(rs.next()){
			      VoteData element = new VoteData();
			      data.add(element);
			  }
		} catch (SQLException e) {
			e.printStackTrace();
		}
	    Gson gson = new GsonBuilder().create();
        String candidatesJson = gson.toJson(data);
        return candidatesJson;
	}
    
}
