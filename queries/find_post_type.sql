SELECT COUNT(*) FROM public."Post" as post
WHERE lower(post.message) ~* 'rempla(ç|c)ant(e)?';

SELECT COUNT(*) FROM public."Post" as post
WHERE lower(post.message) ~* 'remplacement?';

SELECT COUNT(*) FROM public."Post" as post
WHERE lower(post.message) ~* 'cession';