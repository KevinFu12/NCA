import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
// import Vector "mo:vector/Class";
// import TextX "mo:xtended-text/TextX";
import Fuzz "mo:fuzz";

actor Data {
  type User = {
    internet_identity: Principal;
    first_name: Text;
    last_name: Text;
    email: Text;
    dob: Text;
    balance: Nat;
    timestamp: Time.Time;
  };

  // To store users, using Principal as key
  let users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

  // Register new user
  public shared func registerUser(
    msg: { caller: Principal },
    first_name: Text,
    last_name: Text,
    email: Text,
    dob: Text
  ) : async Result.Result<User, Text> {
    let user_id = msg.caller;

    if (users.get(user_id) != null) {
      return #err("User already exists");
    };

    for (user in users.vals()) {
      if (user.email == email) {
        return #err("Email already exists");
      };
    };

    let user: User = {
      internet_identity = user_id;
      first_name = first_name;
      last_name = last_name;
      email = email;
      dob = dob;
      balance = 0;
      timestamp = Time.now();
    };

    users.put(user.internet_identity, user);
    return #ok(user);
  };

  // Get user by principal
  public query func getUser(principal: Principal) : async ?User {
    return users.get(principal);
  };

  // Update user by principal
  public shared func updateUser(
    principal: Principal,
    updated_user: User
  ) : async Result.Result<Text, Text> {
    if (users.get(principal) == null) {
      return #err("User not found");
    };

    users.put(principal, updated_user);
    return #ok("User updated successfully");
  };

  // Delete user by principal
  public shared func deleteUser(msg: { caller: Principal }, principal: Principal) : async Result.Result<User, Text> {
    if (msg.caller != principal) {
      return #err("Unauthorized access");
    };

    let removedUser = users.remove(principal);
    switch (removedUser) {
      case (?user) return #ok(user);
      case null return #err("User not found");
    };
  };

  // Seed database with random users
  public shared func seed_user(msg: { caller: Principal }) : async Result.Result<Text, Text> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err("You are Unauthorized :)");
    };

    let fuzz = Fuzz.Fuzz();
    let amount = fuzz.nat.randomRange(4, 11);

    for (i in Iter.range(0, amount)) {
      let id = fuzz.principal.randomPrincipal(10);

      let user: User = {
        internet_identity = id;
        first_name = fuzz.text.randomText(fuzz.nat.randomRange(5, 25));
        last_name = fuzz.text.randomText(fuzz.nat.randomRange(5, 25));
        email = fuzz.text.randomText(fuzz.nat.randomRange(5, 25)) # "@gmail.com";
        dob = "01/01/1990";
        balance = 0;
        timestamp = Time.now();
      };

      users.put(user.internet_identity, user);
      Debug.print("Seeded " # Nat.toText(i + 1) # " users out of " # Nat.toText(amount + 1));
    };
    return #ok("Seeding complete");
  };

  // Clean the database
  public shared func clean(msg: { caller: Principal }) : async Result.Result<Text, Text> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err("You are Unauthorized :)");
    };

    for (user in users.vals()) {
      ignore users.remove(user.internet_identity);
    };
    return #ok("Cleaned");
  };

  public shared func addCoins(principal: Principal, amount: Nat) : async Result.Result<Text, Text> {
    let user = users.get(principal);
    switch (user) {
        case (?user) {
            let updatedUser = {
                user with
                balance = user.balance + amount;
            };
            users.put(principal, updatedUser);
            return #ok("Coins added successfully");
        };
        case (null) {
            return #err("User not found");
        };
    };
  };

  public shared func deductCoins(principal: Principal, amount: Nat) : async Result.Result<Text, Text> {
    let user = users.get(principal);
    switch (user) {
        case (?user) {
            if (user.balance < amount) {
                return #err("Insufficient balance");
            };
            let updatedUser = {
                user with
                balance = user.balance - amount;
            };
            users.put(principal, updatedUser);
            return #ok("Coins deducted successfully");
        };
        case (null) {
            return #err("User not found");
        };
    };
  };

  public query func getBalance(principal: Principal) : async Result.Result<Nat, Text> {
    let user = users.get(principal);
    switch (user) {
        case (?user) return #ok(user.balance);
        case (null) return #err("User not found");
    };
  };
};
