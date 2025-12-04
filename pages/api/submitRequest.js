import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("main");

    const { team, items, total, timestamp } = req.body;

    const result = await db.collection("requests").insertOne({
      team,
      items,
      total,
      timestamp
    });

    return res.status(200).json({ success: true, id: result.insertedId });
  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
