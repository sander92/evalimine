package evalimised;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Properties;

import com.google.appengine.api.rdbms.AppEngineDriver;


public class FetchData {

    private static Connection connection = null;

    public static Connection getConnection() {

		Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
		    c = DriverManager.getConnection("jdbc:google:rdbms://netivalimised2013:netivalimised/guestbook", "root", "");
		 } catch (SQLException e) {
		        e.printStackTrace();
		 }
		return c;

    }
    
    public static ArrayList<Countries> getCandidates() {
    	connection = FetchData.getConnection();
        ArrayList<Countries> countryList = new ArrayList<Countries>();
        try {
            Statement statement = connection.createStatement();
            ResultSet rs = statement.executeQuery("select isikNimi from Kandidaadid");
        
            while(rs.next()) {	
            	Countries country=new Countries();
            	country.setName(rs.getString("Name"));
            	countryList.add(country);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return countryList;
    }
}
