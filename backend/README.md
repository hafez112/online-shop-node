Backend (Node + Express + lowdb)

1) تثبيت:
   cd backend
   npm install

2) إنشاء مدير:
   npm run create-admin admin@example.com admin123

3) تشغيل:
   npm run dev

الـ API:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/products
- POST /api/products (admin)
- PUT /api/products/:id (admin)
- DELETE /api/products/:id (admin)
- POST /api/orders
- GET /api/orders (admin)
- GET /api/admin/stats (admin)
