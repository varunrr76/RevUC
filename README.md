# RevUC

### Inspiration
Working in the banking sector has always been exciting. The integration of technology and banking always leads to something cool. Integrating new immersive technologies like AR into banking was a fun challenge. It opens up endless possibilities of things to create in AR than improve customers' banking experience.

### What it does
The mobile application integrated with AR technology changes the way how a customer interacts with a banking application.

### How we built it
We used IONIC framework for the hybrid mobile application and used AR.js for all the AR stuff. As both IONIIC and AR.js are web-based tools, they go well with each other. All the data that is displayed on the frontend is fetched from the backend built on Node.

### Challenges we ran into
Figuring out a way to integrate AR.js with IONIC framework was the first challenge we faced.
Fetching the data dynamically from the backend for displaying the AR elements. We used a kind of hack to load the data on page load using the onLoad function. There can be a better way to do it but we were not able to figure it out.
AR.js is primarily a marker-based AR library. We were not able to implement custom markers.
Accomplishments that we're proud of
We hopped on the Augmented Reality technology. We have never done anything related to AR before.
What we learned
There is no limit that technology can accomplish. You just need to have that curiosity to keep exploring.

### What's next for AR in Banking
The possibilities are endless. Few ideas which we had but couldn't implement:

Show the improvement in credit score, when the customer pays the remaining due amount.
Two cards can be placed side by side to seamlessly initiate a fund transfer.

### Built With
IONIIC Node.js

### RESTfulAPIs:

https://vast-earth-78951.herokuapp.com

endpoint:

GET /login :

Header must:
content-type: application/x-www-form-urlencoded
Form:
username: Ak
password: 1234

Response:
JWT -> (optional)
200 - OK
400 - FAILED

GET /getDebitCardDetails :

Req:
JWT -> (optional)

Response:

{
"availableBalance" : "$ 20,000",
"expenseCatogories" : [
{"categoryName": "Food", "totalExpence" : "$200", "color" : "#79bac1", "theta-length" : "90", "theta-start" : "0"},
{"categoryName": "Non-Food", "totalExpence" : "$150", "color" : "#512b58", "theta-length" : "180", "theta-start" : "90"},
{"categoryName": "Pharma", "totalExpence" : "$300", "color" : "#2a7886", "theta-length" : "90", "theta-start" : "270"}
],
"transactionList" : [
{"date": "02/15/2020", "totalExpence" : "$10"},
{"date": "02/16/2020", "totalExpence" : "$20"},
{"date": "02/17/2020", "totalExpence" : "$25"},
]
}

GET /getCreditCardDetails:

Req:
JWT -> (optional)

{
"creditScore": 250,
"dueAmount" : "$ 20,000",
"dueDate" : "02/29/2020",
"transactionList" : [
{"date": "02/15/2020", "totalExpence" : "$10"},
{"date": "02/16/2020", "totalExpence" : "$20"},
{"date": "02/17/2020", "totalExpence" : "$25"},
]
}



