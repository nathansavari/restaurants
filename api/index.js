import { MongoClient } from "mongodb";

// MongoDB connection URI should be set as an environment variable
// Example: mongodb+srv://username:password@your-cluster-url/test?retryWrites=true&w=majority
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  try {
    await client.connect();
    const collection = client.db("Foodbacklog").collection("restaurants");

    // If the title parameter is present, use it to filter the results
    const { title } = req.query;
    const query = title ? { title: { $regex: new RegExp(title, "i") } } : {};

    // Fetching the restaurants from the database with an optional title filter
    const restaurants = await collection.find(query).toArray();

    // Returning the restaurants as JSON
    res.status(200).json(restaurants);
  } catch (e) {
    // In case of an error, return a server error status
    res.status(500).json({ error: e.message });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
