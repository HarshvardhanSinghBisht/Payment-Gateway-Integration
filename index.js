const express = require('express');
const paypal = require('paypal-rest-sdk');
const path =require("path");
const mongoose=require("mongoose");
const app = express();
const bodyParser = require("body-parser");

const PORT=3000;


mongoose.connect('mongodb://localhost/ContactUs',{useNewUrlParser: true,  useUnifiedTopology: true  });


app.use(express.static(__dirname));
app.use(express.urlencoded());

  
var CSchema=new mongoose.Schema({
  name:String,
  phone:String,
  email:String,
  address:String,
  desc:String
  
});

var contact=mongoose.model('contact',CSchema);

app.get('/Contact',(req,res)=>{
  res.sendFile(path.join(__dirname + '/html/Contact.html'));
});

app.post('/Contact', (req, res) => {
  var myData=new contact(req.body);
  myData.save().then(()=>{
    res.send("This item has been saved to database");
    
  }).catch(()=>{
    res.status(400).send("Item was not saved to the database")
  })  
}); 


paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Af-N2e2riKeHwS4BaoCqgvR6Jof4jeAEGpiJeUTrvyVFiz3GIaCkJGRHnJf7uZpqpL_-HDOhP5FV3t65',
  'client_secret': 'EMJHwcUMmMsp1hFCLYXSSDNtGfr6zU5Wc6ADavsioL9cDhGp4QGdmDSFLfO-RF3utODGOOs0_mZwdTgL'
});


app.get('/', (req, res) => res.sendFile(__dirname + "/html/index.html"));



app.post('/payyy', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Donation",
                "sku": "001",
                "price": "500.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "500.00"
        },
        "description": "Thanks A Lot For your Donation.."
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});

});


app.get('/success', (req, res) => {
   const payerId = req.query.PayerID;
   const paymentId = req.query.paymentId;
   const execute_payment_json = {
       "payer_id": payerId,
       "transactions": [{
             "amount": {
                   "currency": "USD",
                  "total": "500.00"
                  }
           }]
     
            };
     
 paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
          if (error) {
                  console.log(error.response);
                   throw error;
              } else {
                 console.log(JSON.stringify(payment));
                     res.send('Your 500$ Donation Is Successfull');
                 }
       });
 });


 
app.post('/payy', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Donation",
                "sku": "001",
                "price": "100.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "100.00"
        },
        "description": "Thanks A Lot For your Donation.."
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});

});


app.get('/success', (req, res) => {
   const pId = req.query.pID;
   const paymentId = req.query.paymentId;
   const execute_payment_json = {
       "payer_id": payerId,
       "transactions": [{
             "amount": {
                   "currency": "USD",
                  "total": "100.00"
                  }
           }]
     
            };
     
 paypal.payment.execute(pId, execute_payment_json, function (error, payment) {
          if (error) {
                  console.log(error.response);
                   throw error;
              } else {
                 console.log(JSON.stringify(payment));
                     res.send('Your 100$ Donation Is Successfull');
                 }
       });
 });


 
app.post('/pay', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Donation",
                "sku": "001",
                "price": "5.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "5.00"
        },
        "description": "Thanks A Lot For your Donation.."
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});

});


app.get('/success', (req, res) => {
   const payerId = req.query.PayerID;
   const paymentId = req.query.paymentId;
   const execute_payment_json = {
       "payer_id": payerId,
       "transactions": [{
             "amount": {
                   "currency": "USD",
                  "total": "5.00"
                  }
           }]
     
            };
     
 paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
          if (error) {
                  console.log(error.response);
                   throw error;
              } else {
                 console.log(JSON.stringify(payment));
                     res.send('Your 5$ Donation Is Successfull');
                 }
       });
 });


 

app.get('/cancel', (req, res) => res.send('Cancelled'));
              


app.listen(PORT, () => console.log(`Server Started on ${PORT}`));

