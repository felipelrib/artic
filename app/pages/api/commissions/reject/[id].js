import { rejectCommission } from '../../../../services/commissions';

export default async function handler(req, res) {
  return new Promise(async (resolve, reject) => {
    if (req.method === "POST") {
      const { id } = req.query;
      try {
        await rejectCommission(id);
        res.status(200).end();
        return resolve();
      } catch (e) {
        res.status(500).end();
        return reject(e);
      }
    } else {
      res.status(405).end();
      return resolve();
    }
  });
}

export const config = {
  api: {
    bodyParser: false
  }
}
