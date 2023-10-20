SELECT id, city, "postalCode", "paymentId", "paymentStatus", published 
FROM public."Post" as p
ORDER BY "createdAt" DESC
LIMIT 10