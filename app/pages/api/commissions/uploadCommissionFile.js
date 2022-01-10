import { uploadFile } from '../../../services/file';
import { updateCommissionImage } from '../../../services/commissions';
import * as formidable from "formidable";

export default async function handler(req, res) {
  return new Promise((resolve, reject) => {
    if (req.method === "POST") {

      const form = new formidable.IncomingForm({ keepExtensions: true });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          res.status(500).end();
          return reject(err);
        }

        try {
          const image = files.image;
          const commission = JSON.parse(fields.commission);
          const imageId = await uploadFile(image);
          if (imageId) {
            await updateCommissionImage(imageId, commission);
          }

          res.status(200).end();
          return resolve();
        } catch (e) {
          res.status(500).end();
          return reject(e);
        }
      });
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
