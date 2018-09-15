# nodejs-PizzaServiceAPI

Restful API providing structures for managing users and orders 

This project consists of a backend for a pizza service. 
Written exclusively using nodejs, this project contains structures for managing users and allowing them to "log in" using tokens.
Users can also retrieve menu items, add items to their shopping cart and place orders.

In addition, the API integrates with stripe.com, providing the possiblity to perform credit card payments,
and with mailgun.com, to send notification emails to users after a successful order has been placed.
(Documentation and api keys to these services may be found on their respective sites.)

Menu items have been hardcoded for educational purposes.


DOCUMENTATION

PizzaServiceAPI provides following functionality:

****************************************************************************************************

/users
POST    (Requires: name, email, address, phone, password)
GET     (Requires: phone) + LOGIN (token passed in header)
PUT     (Requires: phone & one or more parameters to update) + LOGIN (token passed in header)
DELETE  (Requires: phone) + LOGIN (token passed in header)

/tokens
POST    (Requires: phone, password)
GET     (Requires: token)
PUT     (Requires: token, extend expiration time(boolean))
DELETE  (Requires: token)

/items
GET     (Requires:) + LOGIN (token passed in header)

/carts
POST    (Requires: item, quantity) + LOGIN (token passed in header)
GET     (Requires:) + LOGIN (token passed in header)
PUT     (Requires: item, quantity) + LOGIN (token passed in header)
DELETE  (Requires:) + LOGIN (token passed in header)

/orders
POST    (Requires:) + LOGIN (token passed in header)
GET     (Requires:) + LOGIN (token passed in header)



****************************************************************************************************
(Please refer to config file for application configuration settings)

