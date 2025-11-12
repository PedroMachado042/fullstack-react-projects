import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Female Characters
  {
    email: "annabeth.chase@camp.com",
    fullName: "Annabeth Chase",
    password: "123456",
    profilePic: "https://i.pinimg.com/564x/8d/08/19/8d0819f0851186058e2d75fa8658110c.jpg",
  },
  {
    email: "rachel.dare@camp.com",
    fullName: "Rachel Elizabeth Dare",
    password: "123456",
    profilePic: "https://cdn.rickriordan.com/wp-content/uploads/2016/04/11230308/RachelDare-299x416.jpg",
  },
  {
    email: "reyna.ramirez@camp.com",
    fullName: "Reyna Ramirez-Arellano",
    password: "123456",
    profilePic: "https://cdn.rickriordan.com/wp-content/uploads/2016/04/11230306/ReynaRamirezArellano.jpg",
  },
  {
    email: "calypso.ogygia@camp.com",
    fullName: "Calypso",
    password: "123456",
    profilePic: "https://i.quotev.com/5ivx5o56aaaa.jpg",
  },
  {
    email: "bianca.diangelo@camp.com",
    fullName: "Bianca di Angelo",
    password: "123456",
    profilePic: "https://pm1.aminoapps.com/6502/28220d8f09157afeb7caee49c9d2950afd66e55e_hq.jpg",
  },

  // Male Characters
  {
    email: "percy.jackson@camp.com",
    fullName: "Percy Jackson",
    password: "123456",
    profilePic: "https://preview.redd.it/pjo-the-most-iconic-artwork-of-percy-and-annabeth-by-viria-v0-1yxvo34burye1.jpg?width=640&crop=smart&auto=webp&s=451ab999b8490d79c53bccd83fef6c25d3e7c131",
  },
  {
    email: "nico.diangelo@camp.com",
    fullName: "Nico di Angelo",
    password: "123456",
    profilePic: "https://pbs.twimg.com/profile_images/1444465540026679301/rmVA3xrg_400x400.jpg",
  },
  {
    email: "leo.valdez@camp.com",
    fullName: "Leo Valdez",
    password: "123456",
    profilePic: "https://pm1.aminoapps.com/6473/654fa17f4bc1df6824e23f15d472d133bc4c6899_hq.jpg",
  },
  {
    email: "jason.grace@camp.com",
    fullName: "Jason Grace",
    password: "123456",
    profilePic: "https://assets.change.org/photos/5/uh/bs/XMuHBSVJIIcJOvR-1600x900-noPad.jpg?1616496201",
  },
  {
    email: "frank.zhang@camp.com",
    fullName: "Frank Zhang",
    password: "123456",
    profilePic: "https://cdn.rickriordan.com/wp-content/uploads/2016/04/11230317/FrankZhang.jpg",
  },
  {
    email: "will.solace@camp.com",
    fullName: "Will Solace",
    password: "123456",
    profilePic: "https://i.pinimg.com/736x/e1/4d/d9/e14dd9e119cb895159431607124362b4.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
