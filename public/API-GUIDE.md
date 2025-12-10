# Product API Usage Guide

## Add Product Endpoint

**URL:** `POST /api/seller/products?userId={userId}`

**Headers:**

```
Content-Type: application/json
```

## Sample Request

### Using curl:

```bash
curl -X POST "http://localhost:3000/api/seller/products?userId=YOUR_USER_ID" \
  -H "Content-Type: application/json" \
  -d @public/sample-product.json
```

### Using JavaScript fetch:

```javascript
const productData = await fetch("/sample-product.json").then((r) => r.json());

const response = await fetch("/api/seller/products?userId=YOUR_USER_ID", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(productData),
});

const result = await response.json();
console.log(result);
```

### Using the Product Form:

The form in `components/customs/seller/products/product-form.tsx` automatically calls this API when you submit.

## Response

**Success (200):**

```json
{
  "message": "Product created",
  "product": {
    "id": 123,
    "title": "iPhone 16 Pro Max",
    "slug": "iphone-16-pro-max-titanium-black-256gb",
    ...
  }
}
```

**Error (400/500):**

```json
{
  "error": "Error message here"
}
```

## Required Fields

- `title` - Product title
- `slug` - URL-friendly slug
- `brand` - Product brand
- `gadgetType` - Type of gadget (smartphone, laptop, etc.)
- `status` - draft, active, or archived
- `images[]` - At least one image with url and alt
- `variants[]` - At least one variant with sku, price, stock

## Optional Fields

All tech specification fields are optional. Only include the ones relevant to your product type.

See `public/sample-product.json` for a complete example with all possible fields.

## Testing

1. Copy `sample-product.json`
2. Modify the data as needed
3. Make sure you have a valid `userId`
4. Send POST request to the API
5. Check the response for success or errors
