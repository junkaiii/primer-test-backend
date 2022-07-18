import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 4000;

const API_KEY = "8f92f963-3a2a-4966-ab9d-4fbcd17c61fe";
const PRIMER_API_URL = 'https://api.sandbox.primer.io';

app.use(cors());
app.use(express.json());


app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/', (req, res) => {
	return res.sendFile(checkoutPage)
})
 
app.post('/client-session', async (req, res) => {
	const url = `${PRIMER_API_URL}/client-session`
  const { lineItems } = req.body.order;
	const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Version": "2.1",
      "X-Api-Key": API_KEY,
    },
    body: JSON.stringify({
      orderId: "order-" + Math.random(),

      currencyCode: "EUR",

      order: {
        lineItems: lineItems.map((item) => ({
          itemId: item.id.toString(),
          description: item.description,
          quantity: item.quantity,
          amount: Math.round(item.price * 100),
        }))
      },
    }),
  }).then((data) => data.json());
  console.log({
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Version": "2.1",
      "X-Api-Key": API_KEY,
    },
    body: JSON.stringify({
      orderId: "order-" + Math.random(),

      currencyCode: "EUR",

      order: {
        lineItems: [
					{
						itemId: 'shoes-123',
						description: 'Some nice shoes!',
						amount: 2500, // Amount should be in minor units!
						quantity: 1,
					},
				], // create function to map units based on currency
      },
    }),
  })
  console.log(response)
	return res.send(response)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
