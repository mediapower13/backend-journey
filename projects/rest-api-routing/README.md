# REST API Design & Advanced Routing

This project demonstrates RESTful API design, router organization, centralized error handling, and URL-based versioning.

## Structure

- `/api/v1/users`
- `/api/v1/posts`
- `/api/v1/comments`
- `/api/v2/users`
- `/api/v2/posts`
- `/api/v2/comments`

## Run

```bash
npm install
npm start
```

## Notes

- `v1` returns direct resource objects.
- `v2` returns wrapped response payloads with version metadata.
- Errors are returned in a consistent format: `{ error: { code, message, statusCode } }`.
