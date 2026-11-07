# ALL_IN_ONE — Akıllı Tahta Ders Ekranı

Google E-Tablolar üzerinde çalışan, kelime ve cümle çevirisi için akıllı tahtada kullanılan ders ekranı.
Tek bir **Veriler** sekmesi ve 4 farklı ders ekranı görünümü içerir.

## Klasör yapısı

```
ALL_IN_ONE/
  README.md            bu dosya
  CHANGELOG.md         sürüm geçmişi
  ELEMAN_ADLARI.md     tablodaki öğelerin ortak adları ve hücre haritası
  .gitignore
  script/              Google Apps Script kodu
    Kod.gs
    appsscript.json
  dosyalar/            her sürümün .xlsx kopyası
    ALL_IN_ONE_v1.0.xlsx
    ALL_IN_ONE_v1.1.xlsx
```

## Sürüm kuralı
- Küçük değişiklik: v1.1, v1.2 …
- Köklü değişiklik (yeni sekme düzeni, Veriler yapısı): v2.0, v3.0 …
- Dosya (.xlsx) ve script aynı sürüm numarasını taşır.
- Her sürüm Git'te `vX.Y` etiketiyle (tag) işaretlenir.

## Kurulum (kısa)
1. `dosyalar/` içindeki en son .xlsx'i Google Drive'a yükleyin → **Google E-Tablolar olarak kaydet**.
2. Onay kutuları TRUE/FALSE görünüyorsa ilgili aralıkları seçip **Ekle → Onay kutusu**.
3. **Uzantılar → Apps Script** → `script/Kod.gs` içeriğini yapıştırın → kaydedin → sayfayı yenileyin.

## Önemli notlar
- Sekme adları script ile eşleşmelidir: `4 Yan Yana`, `2x2 Kutu Solda`, `2x2 Simetrik`, `4li Kutu`.
- Mobil E-Tablolar uygulamasında üstteki görünüm menüsüyle sekme geçişi çalışmaz.
- Veriler (kelimeler, resimler) Git'te otomatik izlenmez; .xlsx yedeklerini `dosyalar/` altında saklayın.
