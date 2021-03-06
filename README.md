# nodejs-PizzaServiceAPI

Restful JSON API providing structures for managing users and orders.

This project consists of a backend for a pizza service. 
Written exclusively using nodejs, this project contains structures for managing users and allowing them to "log in" using tokens. Users can also retrieve menu items, add items to their shopping cart and place orders. 


In addition, the API integrates with stripe.com, providing the possiblity to perform credit card payments,
and with mailgun.com, to send notification emails to users after a successful order has been placed.
(Documentation and api keys to these services may be found on their respective sites.)

Menu items have been hardcoded for educational purposes.


DOCUMENTATION

PizzaServiceAPI provides following functionality:

****************************************************************************************************

/users

POST    (Requires: name, email, address, phone, password)

GET     (Requires: phone, LOGIN(token))

PUT     (Requires: phone & one or more parameters to update, LOGIN)

DELETE  (Requires: phone, LOGIN)


/tokens

POST    (Requires: phone, password)

GET     (Requires: token)

PUT     (Requires: token, extend expiration time(boolean))

DELETE  (Requires: token)


/items

GET     (Requires: LOGIN)


/carts

POST    (Requires: item, quantity, LOGIN)

GET     (Requires: LOGIN)

PUT     (Requires: item, quantity, LOGIN)

DELETE  (Requires: LOGIN)


/orders

POST    (Requires: LOGIN)

GET     (Requires: LOGIN)


****************************************************************************************************
Request bodies are expected in JSON format. 


(Please refer to config file for application configuration settings)

