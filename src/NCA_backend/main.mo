import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
// import Blob "mo:base/Blob";
// import Array "mo:base/Array";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Vector "mo:vector/Class";
import TextX "mo:xtended-text/TextX";
import Fuzz "mo:fuzz";

actor Data{
  public shared query (msg) func idprincipal() : async Text {
    let caller = msg.caller;
    Principal.toText(caller);
  };

  type User = {
    internet_identity : Principal;
    first_name : Text;
    last_name : Text;
    email : Text;
    birth_date : Text;
    company_ids : [Text];
    timestamp : Time.Time;
  };
  
  //To store users, (Principal as key, and User as value)
  let users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

  //Register new user
  public shared (msg) func registerUser(first_name : Text, last_name : Text, email : Text, birth_date : Text) : async Result.Result<User, Text> {
    let user_id = msg.caller;

    if(users.get(user_id) != null){
      return #err("User already exists");
    };

    for(user in users.vals()){
      if(user.email == email){
        return #err("Email already exists");
      };
    };

    let user = {
      internet_identity = user_id;
      first_name = first_name;
      last_name = last_name;
      email = email;
      birth_date = birth_date;
      company_ids = [];
      selected_company_id = null;
      timestamp = Time.now();
    };

    users.put(user.internet_identity, user);
    return #ok(user);
  };

  public query func getName(userId: Principal) : async Text {
      let user : ?User = users.get(userId);
      switch (user) {
         case (?user) {
            return user.first_name;
         };
         case (null) {
            return "Stranger";
         };

      };
   };

  //Func to get a user by principal
  public query func getUser (principal : Principal) : async ?User{
    return users.get(principal);
  };  

  //Func to update user by principal
  public shared func updateUser (principal : Principal, user : User) : async (){
    users.put(principal, user);
  };

  //func to delete user by principal
  public shared (msg) func deleteUser (principal : Principal) : async ?User{
    if(principal != msg.caller){
      return null;
    };
    return users.remove(principal);
  };

  //Func to get all users in database
  public query func getAll() : async Result.Result<[User], Text>{
    var allUsers = Vector.Vector<User>();

    for(user in users.vals()){
      allUsers.add(user);
    };
    return #ok(Vector.toArray(allUsers));
  };

  //Func to get a user by email
  public query func getByEmail(user_email: Text) : async Result.Result<Principal, Text>{
    for(user in users.vals()){
      let tempEmail = TextX.toLower(user.email);
      if(tempEmail == TextX.toLower(user_email)){
        return #ok(user.internet_identity);
      };
    };

    return #err("User not found");
  };

  public query func getUserName(userID : Text) : async Result.Result<Text, Text>{
    let user = users.get(Principal.fromText(userID));
    switch (user){
      case(?user){
        return #ok(user.first_name # " " # user.last_name);
      };
      case(null){
        return #err("User not found");
      };
    };
  };

  //Func to get a user object by email
  public query func getUserObjByEmail(user_email: Text) : async Result.Result<User, Text>{
    for(user in users.vals()){
      let tempEmail = TextX.toLower(user.email);
      if(tempEmail == TextX.toLower(user_email)){
        return #ok(user);
      };
    };
    return #err("User not found");
  };

  public shared (msg) func seed_user() : async Result.Result<Text, Text>{
    if(Principal.isAnonymous(msg.caller)){
      return #err("You are Unauthorized :)");
    };
    let fuzz = Fuzz.Fuzz();

    let amount = fuzz.nat.randomRange(4,11);

    for(i in Iter.range(0, amount)){
      let id = fuzz.principal.randomPrincipal(10);

      let user = {
        internet_identity = id;
        first_name = fuzz.text.randomText(fuzz.nat.randomRange(5,25));
        last_name = fuzz.text.randomText(fuzz.nat.randomRange(5,25));
        email = fuzz.text.randomText(fuzz.nat.randomRange(5,25)) # "@gmail.com";
        birth_date = "01/01/1990";
        company_ids = [];
        timestamp = Time.now();
      };

      users.put(user.internet_identity, user);
      Debug.print("Seeded " # Nat.toText(i+1) # " users out of " # Nat.toText(amount + 1));
    };
    return #ok("Seeding complete");
  };

  public shared (msg) func clean() : async Result.Result<Text, Text>{
    if(Principal.isAnonymous(msg.caller)){
      return #err("You are Unauthorized :)");
    };

    for(user in users.vals()){
      ignore users.remove(user.internet_identity);
    };
    return #ok("Cleaned");
  };
};