# API Dokumentation

## innehållsförteckning

* [Users](#users)
* [Products](#products)
* [Cart](#cart)
* [Databas tabell](#databas-tabell)
---

## Förord

Alla anrop till API:et ska göras mot bas-URL:en t.ex. `http://localhost:3001`.

---

# Users

| Endpoint                                     | Method | Funktionalitet               |
| -------------------------------------------  | ------ | ---------------------------- |
| [`/api/users`](#get-apiusers)                  | GET    | `hämta alla användare`       |
| [`/api/users/:userId`](#get-apiusersuserId)    | GET    | `hämta en specifik användare`|
| [`/api/users`](#post-apiusers)                 | POST   | `skapa en ny användare`      |
| [`/api/users/:userId`](#put-apiusersuserId)    | PUT    |  `ersätt en användare`       |
| [`/api/users/:userId`](#delete-apiusersuserId) | DELETE | `ta bort en användare`       |

---

### `GET /api/users`

Hämtar alla användare.

#### Request

| Parameter | Typ | Krav | Description                               |
| --------- | --- | ---- | ----------------------------------------- |
| —         | —   | —    | Inga parametrar eller request body krävs. |

#### Response

```json
[
  {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Karlsson"
  }
]
```

#### Statuskoder

| Status                      | Description               |
| --------------------------- | ------------------------- |
| `200 OK`                    | Users hämtades.           |
| `500 Internal Server Error` | Ett serverfel inträffade. |

---

### `GET /api/users/:userId`

Hämtar en specifik användare.

#### Request

**url parameter**

| Parameter | Typ  | Krav | Description                          |
| --------- | ---- | ---- | ------------------------------------ |
| `userId`  | UUID | Ja   | ID för den användare som ska hämtas. |

**Exempel:**

```text
/api/users/550e8400-e29b-41d4-a716-446655440000
```

#### Response

```json
{
  "name": "Karlsson"
}
```

#### Statuskoder

| Status                      | Description                    |
| --------------------------- | ------------------------------ |
| `200 OK`                    | User hittades.                 |
| `400 Bad Request`           | `userId` är ett ogiltigt UUID. |
| `404 Not Found`             | User finns inte.               |
| `500 Internal Server Error` | Ett serverfel inträffade.      |

---

### `POST /api/users`

Skapar en ny användare.

#### Request

**Request body**

```javascript
const payload = {
  name: "Karlsson"
}

const res = await fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
})

const userId = await res.json()
```

#### Response

```text
550e8400-e29b-41d4-a716-446655440000
```

Det genererade `userId` returneras.

#### Statuskoder

| Status                      | Description                              |
| --------------------------- | ---------------------------------------- |
| `201 Created`               | User skapades och `userId` returnerades. |
| `400 Bad Request`           | Request body är ogiltig.                 |
| `500 Internal Server Error` | Ett serverfel inträffade.                |

---

### `PUT /api/users/:userId`

Ersätter en användare.

#### Request

**url parameter**

| Parameter | Typ  | Krav | Description                            |
| --------- | ---- | ---- | -------------------------------------- |
| `userId`  | UUID | Ja   | ID för den användare som ska ersättas. |

**Request body**

```javascript
const payload = {
  name: "Karlsson"
}

const res = await fetch("/api/users/${userId}", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
})

console.log(res.status) // 200
```

Request body innehåller den nya representationen av användaren.

#### Response

Ingen response body.

#### Statuskoder

| Status                      | Description               |
| --------------------------- | ------------------------- |
| `200 OK`                    | User ersattes.            |
| `400 Bad Request`           | Request är ogiltig.       |
| `404 Not Found`             | User finns inte.          |
| `500 Internal Server Error` | Ett serverfel inträffade. |

---

### `DELETE /api/users/:userId`

Tar bort en användare.

#### Request

**url parameter**

| Parameter | Typ  | Krav | Description                            |
| --------- | ---- | ---- | -------------------------------------- |
| `userId`  | UUID | Ja   | ID för den användare som ska tas bort. |

**Exempel:**

```text
/api/users/550e8400-e29b-41d4-a716-446655440000
```

#### Response

Ingen response body.

#### Statuskoder

| Status                      | Description                    |
| --------------------------- | ------------------------------ |
| `204 No Content`            | User togs bort.                |
| `400 Bad Request`           | `userId` är ett ogiltigt UUID. |
| `404 Not Found`             | User finns inte.               |
| `500 Internal Server Error` | Ett serverfel inträffade.      |



# Products

| Endpoint                                     | Method | Funktionalitet               |
| -------------------------------------------  | ------ | ---------------------------- |
| [`/api/products`](#get-apiproducts)                  | GET    | `hämta alla produkter`       |
| [`/api/products/:productId`](#get-apiproductsproductId)    | GET    | `hämta en specifik produkt`|
| [`/api/products`](#post-apiproducts)                 | POST   | `skapa en ny produkt`      |
| [`/api/products/:productId`](#put-apiproductsproductId)    | PUT    |  `ersätt en produkt`       |
| [`/api/products/:productId`](#delete-apiproductsproductId) | DELETE | `ta bort en produkt`       |

---

### `GET /api/products`

Hämtar alla produkter.

#### Request

| Parameter | Typ | Krav | Description                               |
| --------- | --- | ---- | ----------------------------------------- |
| —         | —   | —    | Inga parametrar eller request body krävs. |

#### Response

```json
[
  {
    "productId": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Produkt",
    "price": 99,
    "image": "https://example.com/product.jpg",
    "amountInStock": 10
  }
]
```

#### Statuskoder

| Status                      | Description               |
| --------------------------- | ------------------------- |
| `200 OK`                    | Produkter hämtades.       |
| `500 Internal Server Error` | Ett serverfel inträffade. |

---

### `GET /api/products/:productId`

Hämtar en specifik produkt.

#### Request

**url parameter**

| Parameter   | Typ  | Krav | Description                        |
| ----------- | ---- | ---- | ---------------------------------- |
| `productId` | UUID | Ja   | ID för den produkt som ska hämtas. |

**Exempel:**

```text
/api/products/550e8400-e29b-41d4-a716-446655440000
```

#### Response

```json
{
  "name": "Produkt",
  "price": 99,
  "image": "https://example.com/product.jpg",
  "amountInStock": 10
}
```

#### Statuskoder

| Status                      | Description                       |
| --------------------------- | --------------------------------- |
| `200 OK`                    | Produkten hittades.               |
| `400 Bad Request`           | `productId` är ett ogiltigt UUID. |
| `404 Not Found`             | Produkten finns inte.             |
| `500 Internal Server Error` | Ett serverfel inträffade.         |

---

### `POST /api/products`

Skapar en ny produkt.

#### Request

**Request body**

```javascript
const payload = {
  "name": "Produkt",
  "price": 99,
  "image": "https://example.com/product.jpg",
  "amountInStock": 10
}

const res = await fetch("/api/products", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
})

const productId = await res.json()
```

#### Response

```text
550e8400-e29b-41d4-a716-446655440000
```

Det genererade `productId` returneras.

#### Statuskoder

| Status                      | Description                                      |
| --------------------------- | ------------------------------------------------ |
| `201 Created`               | Produkten skapades och `productId` returnerades. |
| `400 Bad Request`           | Request body är ogiltig.                         |
| `500 Internal Server Error` | Ett serverfel inträffade.                        |

---

### `PUT /api/products/:productId`

Ersätter en produkt.

#### Request

**url parameter**

| Parameter   | Typ  | Krav | Description                          |
| ----------- | ---- | ---- | ------------------------------------ |
| `productId` | UUID | Ja   | ID för den produkt som ska ersättas. |

**Request body**

```javascript
const payload = {
  "name": "Produkt",
  "price": 99,
  "image": "https://example.com/product.jpg",
  "amountInStock": 10
}

const res = await fetch("/api/products/${productId}", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
})

console.log(res.status) // 200
```

Request body innehåller den nya representationen av produkten.

#### Response

Ingen response body.

#### Statuskoder

| Status                      | Description               |
| --------------------------- | ------------------------- |
| `200 OK`                    | Produkten ersattes.       |
| `400 Bad Request`           | Request är ogiltig.       |
| `404 Not Found`             | Produkten finns inte.     |
| `500 Internal Server Error` | Ett serverfel inträffade. |

---

### `DELETE /api/products/:productId`

Tar bort en produkt.

#### Request

**url parameter**

| Parameter   | Typ  | Krav | Description                          |
| ----------- | ---- | ---- | ------------------------------------ |
| `productId` | UUID | Ja   | ID för den produkt som ska tas bort. |

**Exempel:**

```text
/api/products/550e8400-e29b-41d4-a716-446655440000
```

#### Response

Ingen response body.

#### Statuskoder

| Status                      | Description                       |
| --------------------------- | --------------------------------- |
| `204 No Content`            | Produkten togs bort.              |
| `400 Bad Request`           | `productId` är ett ogiltigt UUID. |
| `404 Not Found`             | Produkten finns inte.             |
| `500 Internal Server Error` | Ett serverfel inträffade.         |


# Cart

| Endpoint                                     | Method | Funktionalitet               |
| -------------------------------------------  | ------ | ---------------------------- |
| [`/api/cart/:userId`](#get-apicart)                  | GET    | `hämta alla användare`       |
| [`/api/cart/:userId/product/:productId`](#get-apicartuserId)    | GET    | `hämta en specifik användare`|
| [`/api/cart/:userId`](#post-apicart)                 | POST   | `skapa en ny användare`      |
| [`/api/cart/:userId/product/:productId`](#put-apicartuserId)    | PUT    |  `ersätt en användare`       |
| [`/api/cart/:userId/product/:productId`](#delete-apicartuserId) | DELETE | `ta bort en användare`       |

---

### `GET /api/cart/:userId`

Hämtar hela kundvagnen för en användare.

#### Request

**Path parameter**

| Parameter | Typ  | Krav | Description                                 |
| --------- | ---- | ---- | ------------------------------------------- |
| `userId`  | UUID | Ja   | ID för användaren vars kundvagn ska hämtas. |

**Exempel:**

```text
/api/cart/550e8400-e29b-41d4-a716-446655440000
```

#### Response

```json
[
  {
    "productId": "550e8400-e29b-41d4-a716-446655440001",
    "amount": 2
  },
  {
    "productId": "550e8400-e29b-41d4-a716-446655440002",
    "amount": 1
  }
]
```

#### Statuskoder

| Status                      | Description                    |
| --------------------------- | ------------------------------ |
| `200 OK`                    | Kundvagnen hämtades.           |
| `400 Bad Request`           | `userId` är ett ogiltigt UUID. |
| `500 Internal Server Error` | Ett serverfel inträffade.      |

---

### `GET /api/cart/:userId/product/:productId`

Hämtar en specifik produkt från en användares kundvagn.

#### Request

**Path parameter**

| Parameter   | Typ  | Krav | Description                                 |
| ----------- | ---- | ---- | ------------------------------------------- |
| `userId`    | UUID | Ja   | ID för användaren vars kundvagn ska hämtas. |
| `productId` | UUID | Ja   | ID för produkten som ska hämtas.            |

**Exempel:**

```text
/api/cart/550e8400-e29b-41d4-a716-446655440000/product/550e8400-e29b-41d4-a716-446655440001
```

#### Response

```json
{
  "productId": "550e8400-e29b-41d4-a716-446655440001",
  "amount": 2
}
```

#### Statuskoder

| Status                      | Description                                      |
| --------------------------- | ------------------------------------------------ |
| `200 OK`                    | Produkten hittades i kundvagnen.                 |
| `400 Bad Request`           | `userId` eller `productId` är ett ogiltigt UUID. |
| `404 Not Found`             | Produkten finns inte i kundvagnen.               |
| `500 Internal Server Error` | Ett serverfel inträffade.                        |

---

### `POST /api/cart/:userId`

Lägger till en produkt i en användares kundvagn.

#### Request

**Path parameter**

| Parameter   | Typ  | Krav | Description                                 |
| ----------- | ---- | ---- | ------------------------------------------- |
| `userId`    | UUID | Ja   | ID för användaren vars kundvagn ska ändras. |

**Request body**

```javascript
const payload = {
  "amount": 10
}

const res = await fetch("/api/cart/${userId}", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
})

const productId = await res.json()
```

#### Response

```text
550e8400-e29b-41d4-a716-446655440001
```

Det tillagda `productId` returneras.

#### Statuskoder

| Status                      | Description                         |
| --------------------------- | ----------------------------------- |
| `201 Created`               | Produkten lades till i kundvagnen.  |
| `400 Bad Request`           | Request är ogiltig.                 |
| `500 Internal Server Error` | Ett serverfel inträffade.           |

---

### `PUT /api/cart/:userId/product/:productId`

Ändrar antalet av en produkt som redan finns i kundvagnen.

#### Request

**Path parameter**

| Parameter   | Typ  | Krav | Description                                 |
| ----------- | ---- | ---- | ------------------------------------------- |
| `userId`    | UUID | Ja   | ID för användaren vars kundvagn ska ändras. |
| `productId` | UUID | Ja   | ID för produkten vars antal ska ändras.     |

**Request body**


```javascript
const payload = {
  "amount": 10
}

const res = await fetch("/api/cart/${userId}/product/${productId}", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
})

console.log(res.status) // 200
```

#### Response

Ingen response body.

#### Statuskoder

| Status                      | Description                        |
| --------------------------- | ---------------------------------- |
| `200 OK`                    | Antalet på produkten ändrades.     |
| `400 Bad Request`           | Request är ogiltig.                |
| `404 Not Found`             | Produkten finns inte i kundvagnen. |
| `500 Internal Server Error` | Ett serverfel inträffade.          |

---

### `DELETE /api/cart/:userId/product/:productId`

Tar bort en produkt från en användares kundvagn.

#### Request

**Path parameter**

| Parameter   | Typ  | Krav | Description                                 |
| ----------- | ---- | ---- | ------------------------------------------- |
| `userId`    | UUID | Ja   | ID för användaren vars kundvagn ska ändras. |
| `productId` | UUID | Ja   | ID för produkten som ska tas bort.          |

**Exempel:**

```text
/api/cart/550e8400-e29b-41d4-a716-446655440000/product/550e8400-e29b-41d4-a716-446655440001
```

#### Response

Ingen response body.

#### Statuskoder

| Status                      | Description                                      |
| --------------------------- | ------------------------------------------------ |
| `204 No Content`            | Produkten togs bort från kundvagnen.             |
| `400 Bad Request`           | `userId` eller `productId` är ett ogiltigt UUID. |
| `404 Not Found`             | Produkten finns inte i kundvagnen.               |
| `500 Internal Server Error` | Ett serverfel inträffade.                        |


# Databas tabell


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