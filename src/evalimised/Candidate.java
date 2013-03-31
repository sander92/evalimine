package evalimised;

public class Candidate {

    private int id;
    private String firstName;
    private String lastName;
    private String party;
    private String area;
    
    void setId(int i){
    	id = i;
    }
    void setFName(String s){
    	firstName = s;
    }
    void setLName(String s){
    	lastName = s;
    }
    void setParty(String s){
    	party = s;
    }
    void setArea(String s){
    	party = s;
    }
}

class Party {
	private int id;
	private String name;	
}

class Area {
	private int id;
	private String name;
}

class Person {
	private int id;
	private String name;
}
