## Introduction 
This is a single page application for explore the pet. this apps have CRUD opreation that integrated with API and contained 3 page namely Home, User and Post

[View Demo](https://fathannasrullah.github.io/pet)


## Installation
1. Make sure you have installed Node.js (LTS). If Node.js is already installed in your system, make sure the installed version is LTS (and not the latest version)
2. Navigate to the `skuy-gaskeun` folder and run the following command to install our local dependencies listed in `package.json`. You can use `npm`.

```bash
# For npm
npm install
```

3. Now, you are ready to start the local with the help of the command shown below. Open [http://localhost:5173/](http://localhost:5173/) to check your development 🚀.

```bash
# For npm
npm run dev
```


## Feature
Aplikasi ini tediri dari 3 halaman utama yaitu Home, User, Post.

- Home
  Halaman home berisi daftar post. Halaman ini bisa diakses dengan mengklik navigation 'Home' di sebelah kiri. Feature pada halaman ini yaitu:
  - daftar post yang telah dibuat oleh user
  - search post berdasarkan tag di bagian atas halaman. 
  - pagination di bagian bawah halaman. daftar post terdiri dari beberapa halaman. pengguna bisa menuju ke halaman yang diinginkan.
  
- User 
  Halaman user berisi daftar user dan form untuk membuat user baru. Feature pada halaman ini yaitu:
  - pagination di bagian bawah halaman
  - buat user baru dengan mengklik tombol 'create user' lalu modal buat user akan tampil
  - edit/update data user dengan mengkilk ikon/tulisan 'edit' maka modal edit user akan terbuka
  - hapus user dengan menklik ikon/tulisan 'hapus' maka modal hapus user akan terbuka

- Post
  Halaman post berisi daftar post dan form untuk membuat post baru. Feature pada halaman ini yaitu:
  - pagination di bagian bawah halaman
  - buat post baru dengan mengklik tombol 'create user' lalu modal buat post akan tampil
  - edit/update data post dengan mengkilk ikon/tulisan 'edit' maka modal edit post akan terbuka
  - hapus post dengan menklik ikon/tulisan 'hapus' maka modal hapus post akan terbuka


## Tech Stack
Teknologi yang digunakan dalam pembuatan aplikasi yaitu:
- React.js
- Material UI
- Redux Toolkit
- React Hook Form
- 