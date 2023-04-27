# Tech Challenge - Express CRUD

Olá! Bem vindo ao Tech Challenge da Brasa!

Neste desafio, você está encarregado de criar (ou continuar) essa API básica.
Você tem total liberdade para pesquisar como funciona qualquer coisa, seja uma biblioteca utilizada, ou até particularidades da linguagem JavaScript. Porém, insistimos que você se esforçe ao máximo e tente não copiar o código inteiro — o que mais importa é a sua tentativa, não o produto final, então tente comentar bastante o código com seus pensamentos e ideias.

Para começar o desafio, faça um fork **publico** deste repositório e, enquanto progride, faça commmits para que o time possa analizar seu progresso e linha de raciocínio.

A funcionalidade desejada desta api é um CRUD (Create, Update, Delete) básico para controlar duas tabelas, Person e Roles. Para formar um relacionamento (many to many) entre as duas tabelas, é criado uma terceira tabela, persons_roles.

### **Person**

| Column     | Type              |
| ---------- | ----------------- |
| id         | int (auto-gerado) |
| first_name | varchar (string)  |
| last_name  | varchar (string)  |
| email      | varchar (string)  |

### **Role**

| Column | Type              |
| ------ | ----------------- |
| id     | int (auto-gerado) |
| name   | varchar (string)  |

### **persons_roles**

| Column    | Type |
| --------- | ---- |
| person_id | int  |
| role_id   | int  |

### **Com estas três tabelas, você deve fazer endpoints para atingir as seguintes funcionalidades:**

- Método GET para listar todas entradas em **_Person_**.
- Método GET com parâmetros de busca pelo **_last_name_** para pesquisar em **_Person_**
- Método POST para inserir uma nova entrada em **_Person_** (first_name, last_name, email)
- Método PATCH para atualizar **_first_name_** e **_last_name_** usando o **_email_**
- Método DELETE para remover entradas em **_People_** utilizando **_email_**

---

- Método GET para listar todas entradas em **_Role_**.
- Método POST para inserir uma nova entrada em **_Role_** (name)
- Método DELETE para remover entradas em **_Role_** utilizando **_Name_**

---

- Método POST para vincular uma **_Person_** a uma **_Role_**
- Método GET para buscar todas **_Person_** com uma **_Role_**
- Método GET para buscar todos **_Roles_** de uma **_Person_**
- Método DELETE para remover uma **_Role_** de uma **_Person_**

Fique tranquilo que parece um monte de código, mas a grande maioria ou é simples ou é repetido. Você só precisa se preocupar com a lógica de cada endpoint.

## Dependências:

Primeiramente, você deve ter o Node e o npm instalados, assim como um cliente para testar API's como o Insomnia ou o Postman. Após a instalação destes, rode o comando abaixo no repositório clonado.

```
$ npm install
```

## Para começar o servidor:

```
$ npm start
```
