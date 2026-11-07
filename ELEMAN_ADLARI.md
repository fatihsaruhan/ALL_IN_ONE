# ALL_IN_ONE — Eleman Adları (v1.1)

## A) Ortak öğeler (tüm sekmeler)
| Ad | Açıklama |
|---|---|
| Görünüm menüsü | B1, 🔀 simgeli, sekmeler arası geçiş |
| Başlık | 2. satırdaki koyu çubuk (liste adı, 📖 ile) |
| Liste menüsü | Kategori (Meyveler, Hayvanlar…) seçilen açılır menü |
| Palet menüsü | 20 renk paleti seçilen açılır menü |
| Sayaç | "👁 Açık: x / y · 🎨 Palet n/20" satırı |
| Resim alanı | Seçilen kutunun resminin göründüğü birleşik hücre |
| Genel aç kutusu | B3 (hepsini aç) |
| Genel kapat kutusu | B4 (hepsini kapat / sıfırla) |
| Tip kutusu | Üstte, bir tipin (English, Türkçe…) tüm kartlarını açan kutu |
| Alt satır kutusu | B7 / B9, alt satırları gizler/gösterir |
| Alt not | Tablonun en altındaki açıklama satırı + sürüm etiketi |

## B) Kelime kutusu (tablonun asıl birimi)
| Ad | Açıklama |
|---|---|
| Kelime kutusu | Kalın çerçeveli tek kelimelik grup (numara + kartlar + kart kutuları) |
| Numara | Kelime kutusunun solundaki sıra numarası |
| Kart | Kelime kutusu içindeki tek bir metin hücresi |
| Kart kutusu | Bir kartın yanındaki onay kutusu |
| Tip 1 / 2 / 3 / 4 | Kartın türü: English, Türkçe, Example, Çeviri (adlar Veriler 2. satırdan değişir) |
| Üst satır / Alt satır | Kelime kutusunun içindeki sıra |
| Sol çift / Sağ çift | 2x2 sekmelerde Tip 1-2 ve Tip 3-4 grupları |
| Noktalı çizgi | Kartlar arasındaki ince çizgi |
| Kalın çerçeve | Kelime kutusunun dış çizgisi |
| Zebra | Kelime kutuları arasında dönüşümlü açık/koyu zemin |
| Kapalı kart | "🤔 Tip adı" yazan, işaretsiz kart |

## C) Sekmelere göre yerler
**4 Yan Yana** — Liste menüsü C5, Palet menüsü C6, Sayaç C4:F4. Tip kutuları C3, E3, G3, I3. Resim alanı G4:J6. Kart kutuları C, E, G, I; kartlar D, F, H, J. Satırlar 8–107.

**2x2 Kutu Solda** — Liste C5, Palet C6, Sayaç C7:F7. Tip kutuları C3:C4 (sol çift), E3:E4 (sağ çift). Resim alanı F3:F6. Alt satır kutusu B7. Kart kutuları C (sol), E (sağ); kartlar D, F. Satırlar 8–207.

**2x2 Simetrik** — Liste C5, Palet C6, Sayaç C7:D7. Tip kutuları C3:C4 (sol çift), F3:F4 (sağ çift). Resim alanı E5:F7. Alt satır kutusu B7. Kart kutuları C (sol), F (sağ); kartlar D, E. Satırlar 8–207.

**4li Kutu** — Liste D3, Palet D4, Sayaç C9:E9. Tip kutuları C5:C8 (sol sütun), E5:E8 (sağ sütun). Resim alanı D5:D8. Alt satır kutusu B9. Kart kutuları C, E; kartlar D. Satırlar 10–409.

## D) Veriler sekmesi
- **Liste başlığı:** 1. satır, her listenin adı (dört sütuna yayılı)
- **Tip adı:** 2. satır (English, Türkçe, Example, Çeviri)
- **Veri sütunları:** A:CB (20 liste × 4 tip), satırlar 3–102
- **Resim sütunları:** CD:FE (her liste için 4 tip), yeşil
- **Menü kaynakları:** FG (liste), FI (palet) — dokunulmaz
- **Sürüm etiketi:** FG23, FG24

## E) Gizli yardımcılar (dokunulmaz)
- **Seçim hücreleri:** 4 Yan Yana O3:O4, 2x2 sekmeler K3:K4, 4li Kutu G3:G4
- **Tip sütunu (L):** her satır "ust" ya da "alt" (alt satır filtresi için)
- **Bayrak sütunu (H):** sayaç için açık kart bayrakları
- **Menü kopyaları:** I, J / M, N sütunları (sekmeye göre)
