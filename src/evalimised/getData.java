package evalimised;
import com.google.appengine.api.rdbms.AppEngineDriver;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.*;


public class getData extends HttpServlet{

		
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
	  String tname = req.getParameter("tableName");
	  boolean isVote=true;
	  String id=null;
	  try{
		  id = req.getParameter("id");
	  }
	  catch(Exception e){
		  isVote = false;
	  }


		PrintWriter out = resp.getWriter();

	  Connection c = null;

	    try {
	    	
	      DriverManager.registerDriver(new AppEngineDriver());

	      c = DriverManager.getConnection("jdbc:google:rdbms://netivalimised2013:netivalimised/evalimised","root","");

    	  String statement = createQuery(tname);
			
    	  PreparedStatement stmt = c.prepareStatement(statement);

	      ResultSet rs = stmt.executeQuery();

	      String jsonData = createJSON(rs, tname,id);
          resp.setContentType("application/json");
          resp.setCharacterEncoding("UTF-8");
          resp.getWriter().write(jsonData);
      
	      
	      
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
	
	private static String createQuery(String tname) {
		
	
		String query = "select * from "+tname;

		System.out.println(query);
		return query;
	}
	
	private static String createJSON(ResultSet rs, String tname, String id){
	    if(tname.equals("Area")){
	    	List<Area2> data = new ArrayList<Area2>();
			try {
				while (rs.next()) {
					Area2 area = new Area2();
					area.setArea_Id(rs.getString("Area_Id"));
					area.setAreaName(rs.getString("AreaName"));

					data.add(area);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			Gson gson = new GsonBuilder().create();
			String dataJson = gson.toJson(data);
			return dataJson;
	    }
	    
	    else if(tname.equals("Party")){
	    	List<Party2> data = new ArrayList<Party2>();
			try {
				while (rs.next()) {
					Party2 party = new Party2();
					party.setParty_Id(rs.getString("Party_Id"));
					party.setPartyName(rs.getString("PartyName"));

					data.add(party);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			Gson gson = new GsonBuilder().create();
			String dataJson = gson.toJson(data);
			return dataJson;
	    }
	    
	    else if(tname.equals("Person")){
	    	List<Person2> data = new ArrayList<Person2>();
			try {
				while (rs.next()) {
					Person2 person = new Person2();
					person.setId(rs.getString("Person_Id"));
					person.setLName(rs.getString("LastName"));
					person.setFName(rs.getString("FirstName"));
					person.setParty(rs.getString("PartyID"));
					person.setArea(rs.getString("AreaID"));

					data.add(person);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			Gson gson = new GsonBuilder().create();
			String dataJson = gson.toJson(data);
			return dataJson;
	    }
	    
	    else if(tname.equals("Vote") && id!=null){
	    	List<Vote2> data = new ArrayList<Vote2>();
			try {
				while (rs.next()) {
					Vote2 vote = new Vote2();
					vote.setVote_Id(rs.getString("Vote_Id"));
					vote.setPersonID(rs.getString("PersonID"));
					
					if(rs.getString("voterID").equals(id)){
						vote.setDate(rs.getString("Date"));
						vote.setVoterID(rs.getString("voterID"));
					}
					else{
						vote.setDate("null");
						vote.setVoterID("null");
					}

					data.add(vote);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			Gson gson = new GsonBuilder().create();
			String dataJson = gson.toJson(data);
			return dataJson;
	    }
	    
		return null;
		
	}

}