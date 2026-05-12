# Express Blog

Small Express application demonstrating middleware, routes, and CRUD operations.

Run:

```bash
npm run seed
npm start
```

API endpoints:

- `GET /posts`
- `GET /posts/:id`
- `POST /posts` (requires `x-api-key: secret` header)
- `PUT /posts/:id` (requires `x-api-key: secret` header)
- `DELETE /posts/:id` (requires `x-api-key: secret` header)
