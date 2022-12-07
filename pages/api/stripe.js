const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        shipping_address_collection: {allowed_countries: ['IN']},
        shipping_options: [
          {
            shipping_rate: 'shr_1MCHDuSCN5AAvz988D0kHprt'
          },
          {
            shipping_rate: 'shr_1MCHF7SCN5AAvz98cBTRl3EN'
          }
        ],
        line_items: req.body.cartItems.map((item)=>{  
          const img = item.image[0].asset._ref;
          const newImg = img.replace('image-', 'https://cdn.sanity.io/images/6u0q2q6m/production/').replace('-webp', '.webp');
          return {
            price_data: {
              currency: 'inr',
              product_data: {
                name: item.name,
                images: [newImg]
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
      }
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}