1) تثبيت وتشغيل backend:
   cd backend
   npm install
   npm run create-admin admin@example.com admin123
   npm run dev
   (يعمل على http://localhost:4000)

2) تثبيت وتشغيل frontend:
   cd frontend
   npm install
   npm run dev
   (يعمل على http://localhost:5173)

3) الدخول:
   - افتح /admin/login لتسجيل الدخول كمدير.
   - استخدم الإدريسين وكلمة المرور التي أنشأتها.

تلميحات:
- غيّر JWT secret عبر متغير البيئة JWT_SECRET في بيئة الإنتاج.
- lowdb (الملف data/db.json) مخصص للتطوير فقط.
