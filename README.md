<!-- encrypted-chat-reactjs-nodejs-socketio -->
<!-- 06/10/24 - 07/10/24 Socket.io Denemesi (ReactJS + NodeJS) -->
# Encrypted Chat Based On Socket.io

Bu proje, websocket çalışma prensibini anlama ve Socket.io kullanımını denemek amacıyla geliştirilmiştir. QR kod ile giriş yapılan yapılar, çoklu ya da bire bir mesajlaşma ve çok oyunculu oyunlarda kullanılan websocket mimarisi hakkında bilgi edinme hedeflenmiştir. Proje, ileride kendi projelerimde kullanılmak üzere websocket teknolojisinin potansiyelini keşfetmek için hazırlanmıştır.

### Proje Hakkında
Bu basit mesajlaşma uygulaması, WhatsApp'ın tema renklerinden ilham alınarak tasarlanmıştır. Mesajlaşacak iki kullanıcı, aralarında belirledikleri bir şifreleme anahtarı ile mesajlarını şifreleyerek güvenli bir iletişim sağlayabilirler.

[***Ekran Görüntüleri Sayfa Sonundadır***](#screen-shots-list)

### Çalışma Prensibi
1. Kullanıcıların Şifre Belirlemesi: Sohbete başlamadan önce, kullanıcılar ortak bir şifreleme anahtarı belirler ve onu girerler.
2. Bağlantı Kurma: Kullanıcılar, karşı tarafın ID'sini girerek bağlantı kurarlar.
3. Mesajlaşma: Bağlantı kurulduktan sonra, mesajlaşmaya başlayabilirler.

#### Simetrik Şifreleme (AES-256)
Bu projede simetrik şifreleme kullanılmıştır.

Mesajlar, kullanıcılar arasında belirlenen ortak şifreleme anahtarıyla AES-256 algoritması kullanılarak şifrelenir:

- Şifreleme: Mesajlar, client tarafında şifrelenir ve socket üzerinden şifreli şekilde iletilir.
- Deşifre: Gelen mesajlar, ortak anahtar kullanılarak deşifre edilir ve görüntülenir.


#### Asimetrik Şifreleme (RSA, ECC, DSA)
Projede farklı bir şifreleme yöntemi olarak asimetrik şifreleme kullanılabilir:

- Bağlantı kurulduğunda, iki taraf da birbirlerine public key (genel anahtar) gönderir.
- Mesajlar, karşı tarafın public key'i ile şifrelenir ve iletilir.
- Gelen mesajlar, kullanıcıların kendi private key (özel anahtar) ile çözülerek görüntülenir.


## Kullanılan Teknolojiler

Proje, **TypeScript** kullanılarak geliştirilmiştir ve hem frontend hem de backend tarafında çeşitli teknolojilerle desteklenmiştir.

### Frontend
- **React**: Kullanıcı arayüzünü oluşturmak için kullanıldı. (Typescript)

### Backend
- **Node.js / Express.js**: Sunucu tarafında veri işleme ve socket bağlantılarını yönetmek için kullanıldı. (Javascript)

### Diğer
- **Docker**: Uygulama, container ortamında çalıştırılarak taşınabilir ve izole bir şekilde çalıştırılabilir.
- **Nginx**: Client yayınlama, reverse proxy ile socket.io bağlantılarını yönlendirmek ve SSL kullanarak güvenli bağlantı sağlamak için kullanıldı.
- **OpenSSL**: HTTPS kullanımı gereken alanlarda, örneğin clipboard API'sinin çalışması için, yerel geliştirme ortamında SSL sertifikası oluşturmak amacıyla kullanıldı.


### Kullanılan Kütüphaneler

#### Frontend Kütüphaneleri
- **styled-components**: WhatsApp tema renkleriyle uyumlu basit bir tasarım oluşturmak için kullanıldı.
- **qrcode**: Kullanıcı ID'sini telefondan paylaşmak için QR kod oluşturmak amacıyla kullanıldı.
- **crypto-js**: Simetrik şifreleme için kullanıldı.
- **socket.io-client**: React ile socket'e bağlantı kurmak için kullanıldı.
- **react-router-dom**: Toplu mesajlaşma, şifresiz mesajlaşma ve şifreli mesajlaşma için yönlendirme işlevlerini sağlamak amacıyla kullanıldı. (Uygulama sadece şifreli mesajlaşma sayfasını indirgendiği için kullanım dışı kaldı ama hâlâ sayfa yönlendirmesi yapmakta.)

#### Backend Kütüphaneleri
- **dotenv**: Ortam değişkenlerini yönetmek için kullanıldı.
- **express**: Sunucu uygulaması oluşturmak için kullanıldı.
- **socket.io**: İki ucu birbirine bağlayarak gerçek zamanlı mesajlaşma sağlamak amacıyla kullanıldı.


## Local Hot-Reload Kurulum

- **Gerekenler:**
  - Node.js ve npm kurulmuş olmalıdır.

- **Kullanılan Portlar:** 
    - **1071** \> NodeJS/ExpressJS/SocketIO
    - **5173** \> React-Client Server


1. **Gerekli Bağımlılıkları Kurun:**
    - **Server  Bağımlılıkları:**
        ```bash
                 $ cd server
        ./server $ npm install
        ```
    - **Client Bağımlılıkları:**
        ```bash
                 $ cd client
        ./client $ npm install
        ```
2. **Server'ı Başlatın**
    ```bash
             $ cd server
    ./server $ npm start
    ```
3. **(YENİ TERMİNAL) Client'ı Başlatın**
    ```bash
             $ cd client
    ./client $ npm start
    ```

#### Siteye Giriş
- Tarayıcı üzerinden [http://localhost:5173](http://localhost:5173) adresine giderek siteye ulaşabilirsiniz.
- İki farklı sekmede siteye girerek test edebilirsiniz.


## Docker Compose Kurulum (HTTP)
    
Clipboard özelliği HTTP üzerinde çalışmaz. Bu nedenle, ID'yi manuel olarak 20 karakterin tamamını eksiksiz kopyalamanız gerekmektedir.

- **Gerekenler:**
   - Docker kurulu olmalı.
   - Host kaydı yapılmalı.
- **Kullanılan Portlar:** 
   - **80** &nbsp;&nbsp;&nbsp; \> Nginx 
- **Docker Network Portları:** <br>
    Docker ağı içinde kullanılan portlar, bilgisayarın yerel portları ile çakışmaz:
   - **1071** \> NodeJS/ExpressJS/SocketIO


### Kurulum
#### Docker Run

1. Docker Compose ile konteynerleri ayağa kaldırın:
   ```bash
   $> docker-compose up
   ```

#### Host Ekleme
Sistemin hosts dosyasına aşağıdaki satırları ekleyin:
```plaintext
	127.0.0.1       client.chat.com
	127.0.0.1       socket.chat.com
```
veya

Windows için [Host Ekleme Batch-Script](./addHost.bat)'i çalıştırabilirsiniz. (***Kişisel bilgisayarınızda hazır script çalıştırmadan önce içeriğini kontrol etmenizi öneririm.***)

#### Siteye Giriş
- Tarayıcı üzerinden [http://client.chat.com](http://client.chat.com) adresine giderek siteye ulaşabilirsiniz.
- İki farklı sekmede siteye girerek test edebilirsiniz.




## Docker Compose Kurulum (HTTPS)

Clipbaord özelliği HTTPS üzerinde çalışır.

- **Gerekenler:**
   - Node.js ve npm kurulmuş olmalıdır. (Build için)
   - Docker kurulu olmalı.
   - Host kaydı yapılmalı.
   - OpenSSL (WSL üzerinden de kullanılabilir)
- **Kullanılan Portlar:** 
   - **443** &nbsp;&nbsp;&nbsp; \> Nginx 
- **Docker Network Portları:** <br>
    Docker ağı içinde kullanılan portlar, bilgisayarın yerel portları ile çakışmaz:
   - **1071** \> NodeJS/ExpressJS/SocketIO


### Kurulum

#### SSL Generate
OpenSSL kurulu olmalıdır.

1. Sertifika ve Private Key oluşturun
    ```bash
            $> cd ssl
    ./client$> openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./server.key -out ./server.crt
    ```
2. Sertifika bilgilerini girin
    ```less
    Country Name (2 letter code) [AU]: TR
    State or Province Name (full name) [Some-State]: Ankara
    Locality Name (eg, city) []: Ankara
    Organization Name (eg, company) [Internet Widgits Pty Ltd]: Example Company
    Organizational Unit Name (eg, section) []: IT Department
    Common Name (e.g. server FQDN or YOUR name) []: localhost
    Email Address []: example@example.com
    ```
3. Kontrol
    ssl klasörü içinde server.crt ve server.key olarak 2 dosyanın oluşmuş olması lazım

#### HTTPS Build
Varsayılan build `http://`'dir. Bu yüzden `https://` buildi alınmalı.

- Bağımlılıklar indirin
    ```bash
            $> cd client
    ./client$> npm install # build için kütüphaneler lazım
    ```
- Windows için build
    ```cmd
    ./client> npm run ssl-win-build
    ```
- Linux için build
    ```bash
    ./client$ npm run ssl-build
    ```

#### Docker Compose Edit
SSL için [docker-compose.yml](./docker-compose.yml) içerisindeki düzenlemeleri yapın.

- `service: nginx`  &nbsp; &nbsp; yerine &nbsp; `service: nginx-ssl`
- `service: server` &nbsp; yerine &nbsp; `service: server-ssl`

```yml
  nginx:
    extends:
      service: nginx-ssl # nginx-ssl for SSL
  
  server:
    extends:
      service: server-ssl # server-ssl for SSL
```


#### Docker Run

1. Docker Compose ile konteynerleri ayağa kaldırın:
   ```bash
   $> docker-compose up
   ```

#### Host Ekleme
Sistemin hosts dosyasına aşağıdaki satırları ekleyin:
```plaintext
	127.0.0.1       client.chat.com
	127.0.0.1       socket.chat.com
```
veya

Windows için [Host Ekleme Batch-Script](./addHost.bat)'i çalıştırabilirsiniz. (***Kişisel bilgisayarınızda hazır script çalıştırmadan önce içeriğini kontrol etmenizi öneririm.***)

#### Siteye Giriş
- Tarayısı üzerinden [https://socket.chat.com](https://socket.chat.com) adresine giderek https için izin verilmeli. (SSL sertifikaları self-signed olduğu için hata veriyor.)
- Tarayıcı üzerinden [https://client.chat.com](https://client.chat.com) adresine giderek https için izin verilmeli. (SSL sertifikaları self-signed olduğu için hata veriyor.)
- İzinleri verdikten sonra, tarayıcı üzerinden [https://client.chat.com](https://client.chat.com) adresine giderek siteye ulaşabilirsiniz.
- İki farklı sekmede siteye girerek test edebilirsiniz.





<details>
    <summary style="user-select: none; cursor: pointer; font-size: 24px; font-weight: bold; color: #fff;" id="screen-shots-list">Ekran Görüntüleri</summary>

## Ekran Görüntüleri


> Simetrik Şifreleme Anahtarı <br>
\> Siteye girerken ilk başta bağlantı kuracağınız id ile ortak anahtarınızı girmeniz lazım. (Asimetrik şifrelemede bu aşamaya gerek kalmaz) <br>
<img width="400" src="zscreenshots\1encryptkey.png"><br>

> Karşı Tarafın ID'sini Girme <br>
<img width="1028" src="zscreenshots\2.png"><br>

> Başarılı Sohbet <br>
<img width="1028" src="zscreenshots\3.png"><br>

> Socket-Server Tarafında Mesajların Şifreli Görünümü <br>
<img width="1028" src="zscreenshots\4.png"><br>

> Hatalı ID Girme <br>
<img width="1028" src="zscreenshots\5.png"><br>

> Olmayan ID ile Mesajlaşma <br>
<img width="1028" src="zscreenshots\6.png"><br>

> Karşı Taraf Bağlantıya Katılmadan Mesajlaşma <br>
<img width="1028" src="zscreenshots\7.png"><br>

> Karşı Taraf Bağlantıya Sonradan Katılınca Mesajlaşma <br>
<img width="1028" src="zscreenshots\8.png"><br>

> Farklı Anahtar Kelime ile Mesajlaşma <br>
\> Taraflar farklı anahtar kelime girerse mesajları görüntüleyemez. <br>
<img width="1028" src="zscreenshots\9.png"><br>

> QR-Code ID <br>
\> ID'i telefon üzerinden paylaşmanız için veya telefon ile sohbete bağlanmak için ID'nin QR-Code'a olarak gösterimi. <br>
<img width="1028" src="zscreenshots\10.png"><br>


> Chat Overflow <br>
\> Yeni mesaj geldiğinde chat otomatik olarak yeni mesajı gösterir <br>
<img width="1028" src="zscreenshots\11.png"><br>

</details>



