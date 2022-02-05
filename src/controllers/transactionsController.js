import db from "../db.js";

export async function getTransactions(req, res) {
  const { session } = res.locals;

  try {
    const user = await db.collection('users').findOne({ _id: session.userID });
    const transactions = await db
      .collection('transactions')
      .find({ userID: session.userID })
      .toArray();

    const message = {
      name: user.name,
      transactions,
    };

    res.send(message);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function registrateTransaction(req,res) {
  console.log("cheguei aqui")
  res.send( req.body);
  

}