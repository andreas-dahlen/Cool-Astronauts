


enpoints && http methods:


request exempel:
något exempel på request body, url param, query param etc.

retur data struktur:


status koder:


FÖR EN FRONTENDARE!

minst 20 produkter, 5 dokument i kundvagnen och 2 användare (json-format)

//extra idé: lägg till hur många det finns?

FÖR BACKEND-UTVECKLARE!


|     pk       |      sk       |     name     |  amountInStock | amount | image | price |
|--------------|---------------|--------------|----------------|--------|-------|-------|
|     USER	   |    USER#123   |   Karlsson   |       x        |   x    |   x   |   x   |
|     USER	   |    USER#789	 |     Anna	  	|       x        |   x    |   x   |   x   |
|--------------|---------------|--------------|----------------|--------|-------|-------|
|    PRODUCT 	 |  PRODUCT#123	 |  spaceship	  |       5        |    x   |	https |  76   |
|    PRODUCT 	 |  PRODUCT#789	 |  anotherone	|       8        |    x	  | https |  45   |
|--------------|---------------|--------------|----------------|--------|-------|-------|
|   USER#123   |  PRODUCT#123	 |      x       |       x        |    1   |   x   |   x   |
|   USER#123   |  PRODUCT#789	 |	    x       |       x        |    3   |   x   |   x   |
|   USER#789   |  PRODUCT#789	 |	    x       |       x        |    3   |   x   |   x   |



Ett user-objekt ska innehålla namn och userId.

Ett product-objekt ska innehålla: productId, name, price, image, amountInStock

Ett cart-objekt ska innehålla: userId, productId, amount

```typescript

 /api/products, /api/cart och /api/users (GET, POST, PUT, DELETE)

 //ANVÄNDARFALL (USER):

// [GET] Frontenden skickar inget och får tillbaka namn (object!?) + userIds
// STATUS KODER: 200 okej

// [GET:userId] Frontenden skickar userId(url parameter) och får tillbaka namn (object!?)
// STATUS KODER: 200 okej, 404 not found

// [POST] Frontenden skickar namn(request body??) och får tillbaka userId
// STATUS KODER: 201 created, 400 bad request

// [PUT:userId] Frontenden skickar userId och nytt namn (object!?)
// STATUS KODER: 200 okej, 400 bad request, 404 not found

// [DELETE:userId] Frontenden skickar userId och får tillbaka INGET!
// STATUS KODER: 204 no content, 404 not found

//PRODUCKT (PRODUCT):

// [GET] Frontenden skickar INGET och får tillbaka alla produkter med IDn
// STATUS KODER: 200 okej

// [GET:productId] Frontenden skickar productId och får tillbaka en produkt utan ID
// STATUS KODER: 200 okej, 404 not found

// [POST: body: product] Frontenden skickar namn och får tillbaka productId
// STATUS KODER: 201 created, 400 bad request

// [PUT:productId body: Product] Frontenden skickar id param och prodcut får tillbaka INGET!
// STATUS KODER: 200 okej, 400 bad request, 404 not found

// [DELETE:productId] Frontenden skickar productId
// STATUS KODER: 204 no content, 404 not found


//CART (CART):

//api/cart/:userId, api/cart/:userId/product/:productId (GET, POST, PUT, DELETE)

// [GET:userId] Frontenden skickar userId och får tillbaka alla produkter i cart
// STATUS KODER: 200 okej, 204 no content

// [GET:userId/product/productId] Frontenden skickar userId och productId och får tillbaka en produkt
// STATUS KODER: 200 okej, 404 not found

// [POST:userId: body: product] Frontenden skickar product och får tillbaka productId
// STATUS KODER: 201 created, 400 bad request

// [PUT:userId/prodcut/productId body: Product] Frontenden skickar id param och prodcut får tillbaka INGET!
// STATUS KODER: 200 okej, 400 bad request, 404 not found

// [DELETE:userId/product/productId] Frontenden skickar userId och productId
// STATUS KODER: 204 no content, 404 not found


// api/RESET [DELETE] Frontenden skickar INGET och får tillbaka INGET!
// STATUS KODER: 205 reset content,