# 💻 Online Computer Store — Java Spring Boot проект

Интернет-магазин для продажи компьютерной техники, реализованный с использованием Java, Spring Boot и PostgreSQL. Система поддерживает регистрацию пользователей, просмотр товаров, корзину, оформление заказов, админ-панель и REST API.

---

## 🧾 Описание проекта

Проект **Online Computer Store** предоставляет функциональность онлайн-магазина с современной архитектурой. Покупатели могут просматривать каталог, фильтровать и искать товары, добавлять их в корзину и оформлять заказы. Администраторы управляют товарами, пользователями и заказами через административную панель.

---

## 🚀 Основной стек технологий

- **Backend:** Java 21, Spring Boot, Spring Web, Spring Data JPA, Spring Security
- **База данных:** PostgreSQL
- **ORM:** Hibernate
- **Frontend (по желанию):** HTML/CSS/JS или подключаемый React/Vue
- **Документация API:** Swagger / OpenAPI
- **Сборка:** Gradle (или Maven)
- **Dev Tools:** Lombok, ModelMapper, PostgreSQL Driver

---

## 📦 Структура проекта

│
├── src/
│ ├── main/
│ │ ├── java/com/online/store/
│ │ │ ├── controller/ # Контроллеры REST API
│ │ │ ├── dto/ # DTO-объекты
│ │ │ ├── entity/ # JPA-сущности
│ │ │ ├── repository/ # Интерфейсы репозиториев
│ │ │ ├── service/ # Бизнес-логика
│ │ │ └── OnlineStoreApp.java # Главный класс приложения
│ │ └── resources/
│ │ ├── application.yml # Настройки подключения к БД
│ │ └── static/ # HTML/CSS/JS (если без SPA)
│
├── build.gradle # Сборка проекта
└── README.md # Описание проекта  


---

## 🛠️ Установка и запуск проекта

### 🔧 Требования

- Java 21+
- PostgreSQL (установлен и запущен)
- IntelliJ IDEA / VSCode / другой IDE
- Gradle (или Maven, если используется)

### ⚙️ Шаги запуска

1. **Клонируйте репозиторий:**
```bash
git clone https://github.com/IkramovaIroda/Front_Backend_sayt
cd online-computer-store
