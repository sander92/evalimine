package evalimised;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import evalimised.Countries;
import evalimised.FetchData;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.reflect.TypeToken;

public class EvalimisedServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		ArrayList<Countries> country=new ArrayList<Countries>();
		country=FetchData.getCandidates();
		Gson gson = new Gson();
		JsonElement element = gson.toJsonTree(country, new TypeToken<List<Countries>>() {}.getType());

		JsonArray jsonArray = element.getAsJsonArray();
		response.setContentType("application/json");
		response.getWriter().print(jsonArray);
		
	}
    
    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException{
    	try {
			doGet(req, resp);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }

}