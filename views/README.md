*****----- Taek IT Envanter Sistemi -----*****

  Bu program basit bir envanter yönetim sistemidir.




//***---Kurulum---***//

1-//Programlar//
Programın çalışması için gerekli uygulamalar:

1 - Node.js
    https://nodejs.org

2 - MySQL (Free Comunity Version)
    https://dev.mysql.com/downloads/
    MySQL Installer for Windows seçeneğini indirmeniz tavsiye edilir

3 - Node.js pm2 modülü (Yönetim için isteğe bağlı modül)
    Node.js i yükledikten sonra Komut istemcisine (CMD):

    npm install pm2@latest -g

    Komutunu yazmanız yeterli olacaktır.
    Ayrıntılı bilgi için
    https://pm2.keymetrics.io/ 


2-//Database//

  MySQL Database'ine Erişim için öncelikle MySQL içerisinde "inventory" isimli bir database oluşturulmalıdır. Daha sonra bu database in içerisine gerekli tablolar import edilmelidir.

Gerekli Tablolar

  -depot        //Depodaki malzemelerin olduğu tablodur,
  -list         //Kullanımda malzemelerin olduğu tablodur,
  -usertab      //Kullanıcıların bulunduğu tablodur.


  Node.js iistemcisinin bu database'e erişimi için kontrol panelinden MySQL'e yeni bir kullanıcı eklenmelidir.
  Bu kullanıcının database üzerinde tam kontrol sahibi olması için "DB Access" iznine sahip olması gerekmektedir!!!

  Şuanda kullanıcı olarak:

  Kullanıcı adı: ITman
  Şifre: Kernel1070

  kullanılmaktadır. Eğer bu kullanıcı adı veya şifre değiştirilmek istenirse, tüm .js uzantılı dosyalardaki MySQL connection kısımlarının Kullanıcı adı ve Şifre bölümleri de değiştirilmelidir.


3-//Paket//

  Önceki 2 adım halledildikten sonra Komut istemcisinden (CMD) uygulamanın kurulu olduğu konuma gelinip:

  npm install

  Komutu girilmelidir. Bu komut sayesinde gerekli tüm modüller otomatik olarak yüklenecektir.
  Eğer herşey doğru olarak yapıldıysa

  node app.js

  Komutu ile uygulama başlatılır.
  Daha sağlıklı olan başlatma şekli ise

  pm2 start app.js

  Komutudur. Bu komut sayesinde Komut istemcisi (CMD) kapatılsa veya bir hata ile karşılaşılsa bile program kendini tekrar başlatabilir.




//***---Kullanım---***//

  Kullanıcı satın alınan malzemeleri MySQL veri tabanındaki "depot" tablosuna yerleştirir. Malzeme kişiye verileceği zaman gerekli bilgiler veri tabanındaki "depot" tablosundan çekilir ve veri tabanındaki "list" tablosunda yeni bir kayıt oluşturulur.

  Sistemde 4 Farklı kullanıcı tipi bulunmaktadır

  Admin (Yönetici): Uygulama üzerinde maksimum kontrole sahiptir. Yönetim panelinden yeni Kullanıcılar oluşturabilir, tüm kayıtları görebilir (deaktif edilmiş kayıtları görür)
  Kullanıcı (Kullanıcı): Yetkili kullanıcıdır. Yönetim paneline giremez, tüm yerleşkelerdeki aktif kayıtları görebilir (deaktif edilmiş kayıtları göremez)
  Campus (Yerleşke görevlisi): Yerleşke sorumlusudur. Yönetim paneline giremez, Kendi yerleşkesinde olan aktif kayıtları görebilir (deaktif edilmiş kayıtları göremez)
  Guest (Yetkisiz Kullanıcı): Bu kullanıcının herhangi bir izni yoktur. Sadece giriş yapabilir. Yanlışlıkla verilebilecek izinlerin önüne geçmek için oluşturulmuştur.




//***---Kampüs ekleme---***//

  Eğer yeni bir kampüs eklemek gerekir ise public/javascripts/campuslists.js dosyasının içerisine eklenmelidir.