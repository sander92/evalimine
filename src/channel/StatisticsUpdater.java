package channel;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.jdo.PersistenceManager;

import com.google.appengine.api.channel.ChannelFailureException;
import com.google.appengine.api.channel.ChannelMessage;
import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;
import com.google.appengine.api.rdbms.AppEngineDriver;

import evalimised.StatisticsServlet;

public class StatisticsUpdater {
	public void updateClients() {
		// Get all channel client ids available
		String query = "select from " + ChannelClient.class.getName();
		PersistenceManager pm = PMF.get().getPersistenceManager();
		List<ChannelClient> ids = (List<ChannelClient>) pm.newQuery(query).execute();

		
		String jsonData = getResults("candidate");
	      
		ChannelService channelService = ChannelServiceFactory.getChannelService();
		for (ChannelClient m : ids) {
			String client = m.getClientId();
			try {
				channelService.sendMessage(new ChannelMessage(client, jsonData));
				System.out.println("sent json stream: " + jsonData);
				System.out.println("to client: " + client);
			}catch (ChannelFailureException e) {
				e.printStackTrace();
			}
		}
		pm.close();
	}
	
	public String getResults(String option){
		  Connection c = null;
		    try {
		      DriverManager.registerDriver(new AppEngineDriver());
		      c = DriverManager.getConnection("jdbc:google:rdbms://netivalimised2013:netivalimised/evalimised");

		      if(option != null || option != "") {
		  		String statement = StatisticsServlet.createQuery("candidate");
		  	  	PreparedStatement stmt = c.prepareStatement(statement);
		  	  	ResultSet rs = stmt.executeQuery();
				String jsonData = StatisticsServlet.createJSON(rs, "candidate");
				return jsonData;
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
			return null; 
	}
}

