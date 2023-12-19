# Bước 1

Download PostgreSQL, NodeJS v16.x

```
https://www.postgresql.org/download/windows/
https://nodejs.org/dist/v16.20.0/node-v16.20.0-x64.msi
```

# Bước 2

Mở command line -> cài đặt yarn

```bash
npm i -g yarn
```

# Bước 3

- Tạo database tên `health-clinic`
- Tạo file `.env` từ file `example.env`
- Nhập `DB_PORT`, `DB_USER`, `DB_PASS` vào file `.env`

# Bước 4

Tạo data test
```bash
cd back-end && yarn generate
```

# Bước 5

Chạy server back-end

```bash
cd back-end && yarn start
```

# Bước 6

Tạo một command line khác, chạy server front-end

```bash
cd front-end && yarn start
```

# Chạy test script

```bash
yarn test
```
