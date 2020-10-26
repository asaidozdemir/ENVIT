                                                       
                   AAA                 SSSSSSSSSSSSSSS   
                  A:::A              SS:::::::::::::::S  
                 A:::::A            S:::::SSSSSS::::::S  
                A:::::::A           S:::::S     SSSSSSS  
               A:::::::::A          S:::::S              
              A:::::A:::::A         S:::::S              
             A:::::A A:::::A         S::::SSSS           
            A:::::A   A:::::A         SS::::::SSSSS      
           A:::::A     A:::::A          SSS::::::::SS    
          A:::::AAAAAAAAA:::::A            SSSSSS::::S   
         A:::::::::::::::::::::A                S:::::S  
        A:::::AAAAAAAAAAAAA:::::A               S:::::S  
       A:::::A             A:::::A  SSSSSSS     S:::::S  
      A:::::A               A:::::A S::::::SSSSSS:::::S  
     A:::::A                 A:::::AS:::::::::::::::SS   
    AAAAAAA                   AAAAAAASSSSSSSSSSSSSSS     
                                                       


Bu program Ankara Üniversitesi Bilgisayar Mühendisliği (%100 İngilizce) 4. Sınıf 17290114 numaralı öğrencisi olan Ahmet Said ÖZDEMİR tarafından hazırlanmıştır.



**//--------------------------------------------------------------------------------------------------------------------------------//**
**//--------------------------------------------------------------------------------------------------------------------------------//**
**//--------------------------------------------------------------------------------------------------------------------------------//**
**//--------------------------------------------------------------------------------------------------------------------------------//**
**//--------------------------------------------------------------------------------------------------------------------------------//**





*****----- TAEK IT Envanter Sistemi -----*****

  Bu program basit bir envanter yönetim sistemidir.




//***---Kurulum---***//

**1-//Programlar//**

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




**2-//Database//**

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




**3-//Çalıştırma//**

  Önceki 2 adım halledildikten sonra Komut istemcisinden (CMD) uygulamanın kurulu olduğu konuma gelinip:

    npm install

  Komutu girilmelidir. Bu komut sayesinde gerekli tüm modüller otomatik olarak yüklenecektir.
  Eğer herşey doğru olarak yapıldıysa

    node app.js

  Komutu ile uygulama başlatılır.
  Daha sağlıklı olan başlatma şekli ise

    pm2 start app.js

  Komutudur. Bu komut sayesinde Komut istemcisi (CMD) kapatılsa veya bir hata ile karşılaşılsa bile program kendini tekrar başlatabilir.

  !!
  Varsayılan Kullanıcı

    Username: admin
    Password: taek
  !!

  **//Ekstra//**
    pm2 modülü üzerinden daha detaylı bir izleme yapılmak isteniyor ise

    pm2 list 
    
   ve

    pm2 monit

   konutları kullanılarak sistemle ilgili daha detaylı bilgi alınabilir

  **//Durdurma//**

   Eğer sistemde CMD üzerinde  " node app.js "  komutu ile başlatıldı ise CTRL+C kombinasyonu ile durdurulabilir
   Eğer sistemde CMD üzerinde  " pm2 start app.js "  komutu ile başlatıldı ise  " pm2 stop app.js"  ile durdurulabilir. (Not bu komutu uygulamak için doğru adreste olduğunuza emin olun)

  **//Sıfırlama//**

   Eğer sistemdeki veriler sıfırlanmak istenirse önce MySQL Workbench üzerinden tüm satırlar silinmeli sonra tablo ayarlarından AUTO_INCREMENT ayarı "1" e getirilmelidir. Bu sayede ID numaraları da sıfırlanmış olur.
   (Veya SQL tabloları silinip tekrar yüklenebilir)

  **//Port//**

  Bu web uygulaması 1453 nolu portu kullanmaktadır. Bu portu değiştirmek için app.js dosyasının en altındaki "app.listen" fonksiyonundaki 1453 numarası değiştirilmelidir.


//***---Kullanım---***//

  **1-//Genel//**

  Kullanıcı satın alınan malzemeleri MySQL veri tabanındaki "depot" tablosuna yerleştirir. Malzeme kişiye verileceği zaman gerekli bilgiler veri tabanındaki "depot" tablosundan çekilir ve veri tabanındaki "list" tablosunda yeni bir kayıt oluşturulur.

  **2-//Kullanıcılar//**

  Sistemde 4 Farklı kullanıcı tipi bulunmaktadır. Bunlar:

  Admin (Yönetici): Uygulama üzerinde maksimum kontrole sahiptir. Yönetim panelinden yeni Kullanıcılar oluşturabilir, tüm kayıtları görebilir (deaktif edilmiş kayıtları görür)
  Kullanıcı (Kullanıcı): Yetkili kullanıcıdır. Yönetim paneline giremez, tüm yerleşkelerdeki aktif kayıtları görebilir (deaktif edilmiş kayıtları göremez)
  Campus (Yerleşke görevlisi): Yerleşke sorumlusudur. Yönetim paneline giremez, Kendi yerleşkesinde olan aktif kayıtları görebilir (deaktif edilmiş kayıtları göremez)
  Guest (Yetkisiz Kullanıcı): Bu kullanıcının herhangi bir izni yoktur. Sadece giriş yapabilir. Yanlışlıkla verilebilecek izinlerin önüne geçmek için oluşturulmuştur.

  !!
  Varsayılan Kullanıcı

    Username: admin
    Password: taek

  Bu kullanıcı ilk defa kurulduğunda gelir, sonradan deaktif edilebilir. İlk girişin yapılması için gerekir.
  !!


  **3-//Excel//**

  Veriler Excel tablosu olarak kaydedilebilmektedir. Bunun için ilgili sayfadaki "Excel'e Aktar" butonuna tıklanmalıdır.

  **4-//Admin//**

  Admin, bir işlem yapmak için adres çubuğuna /adminpanel yazmalıdır.

    http://192.168.0.31:1453/adminpanel
   
   veya
   
     localhost:1453/adminpanel
   
   gibi.

   ***//Kullanıcı Ekleme//***

   Admin yönetim paneli (adminpanel) ekranındaki sol üstteki "Kullanıcı ekle" butonundan yeni kullanıcılar ekleyebilmektedir.
   Kullanıcıyı oluştururken Kullanıcı Rolü bölümünden yeni oluşturulacak kullanıcının tipi belirlenmektedir(admin,user,campus,guest).
     Eğer bu kullanıcının rolü yerleşke ("campus") olarak seçilirse sadece görevli olacağı yerleşkedeki kayıtları görebileceği için Yerleşke kısmının doğru seçilmesi önem arz etmektedir.




//***---Kampüs ekleme---***//

  Eğer yeni bir kampüs eklemek gerekir ise it/express/public/javascripts/campuslists.js dosyasının içerisine eklenmelidir.
  Eklenen bu kampüsün  it/express/views/ klasöründeki:

    listupdate.pug
    useradd.pug
    userupdate.pug
    depotgive.pug

  dosyalarındaki:

    " select#campus(name='campus' required) "

  satırlarının altına 
  
    option(value='Yenikampüs') Yenikampüs

  olarak eklenmesi gerekir. Aksi takdirde kullanıcıya gönderilen HTML formlarında bu kampüs görünmeyecektir.





**//--------------------------------------------------------------------------------------------------------------------------------//**
**//--------------------------------------------------------------------------------------------------------------------------------//**
**//--------------------------------------------------------------------------------------------------------------------------------//**
**//--------------------------------------------------------------------------------------------------------------------------------//**
**//--------------------------------------------------------------------------------------------------------------------------------//**
