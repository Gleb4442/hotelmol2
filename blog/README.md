# Roomie Blog - Next.js 14 SEO Blog

Отдельный Next.js 14 блог для Roomie с полной SEO-оптимизацией.

## Запуск

```bash
# Из корневой папки проекта
cd blog && npx next dev -p 4000
```

Блог будет доступен по адресу: http://localhost:4000

## Особенности

- **Next.js 14 App Router** с SSR
- **MDX поддержка** для статей
- **Автоматический sitemap.xml** и robots.txt
- **Schema.org Article** разметка для SEO
- **Динамические мета-теги** с ключевыми словами
- **Подключение к PostgreSQL** через общую схему

## SEO

- H1 с главным ключевым словом + "для готелів Україна"
- Meta title/description с динамическими ключами
- Open Graph теги для соц. сетей
- Schema.org Article для структурированных данных

## База данных

Использует общую таблицу `blog_posts` из PostgreSQL:
- title, slug, content (MDX)
- keywords (массив для SEO)
- metaTitle, metaDescription
- published, publishedAt

## Deploy

Для production деплоя настройте:
1. `NEXT_PUBLIC_SITE_URL` - URL блога (например, https://blog.roomie.com.ua)
2. `DATABASE_URL` - строка подключения к PostgreSQL
