// ALL_IN_ONE v1.1 — Kod.gs
// Akıllı tahta ders ekranı için Apps Script (onEdit tetikleyicisi).
// Sekme adları tam olarak eşleşmelidir: 4 Yan Yana, 2x2 Kutu Solda, 2x2 Simetrik, 4li Kutu.

var SURUM = 'v1.1';
var KAYDIR = 0;  // resim kayık görünürse 1 ya da -1 yapın

var DUZEN = {
  '4 Yan Yana':     {liste:'C5', palet:'C6', secim:'O3:O4', ilk:8,
    sifirla:['C8:C107','E8:E107','G8:G107','I8:I107','C3','E3','G3','I3','B3']},
  '2x2 Kutu Solda': {liste:'C5', palet:'C6', secim:'K3:K4', ilk:8,
    sifirla:['C8:C207','E8:E207','C3:C4','E3:E4','B3']},
  '2x2 Simetrik':   {liste:'C5', palet:'C6', secim:'K3:K4', ilk:8,
    sifirla:['C8:C207','F8:F207','C3:C4','F3:F4','B3']},
  '4li Kutu':       {liste:'D3', palet:'D4', secim:'G3:G4', ilk:10,
    sifirla:['C10:C409','E10:E409','C5:C8','E5:E8','B3']}
};

var GORUNUM = {
  '4 Yan Yana':     ['4 Yan Yana', null],
  '2x2 Kutu Solda': ['2x2 Kutu Solda', null],
  '2x2 Simetrik':   ['2x2 Simetrik', null],
  '4li Kutu Solda': ['4li Kutu', 'sol'],
  '4li Kutu Sağda': ['4li Kutu', 'sag']
};

// Kutu sütunu gizleme (yalnızca 4li Kutu)
var KUTU_AYAR = {
  '4li Kutu': {ilk: 10, son: 409, ana1: 5, ana2: 8}
};

// Alt satırları gizle / göster kutuları
var SATIR_AYAR = {
  '2x2 Kutu Solda': {hucre: 'B7', baslik: 7, son: 207},
  '2x2 Simetrik':   {hucre: 'B7', baslik: 7, son: 207},
  '4li Kutu':       {hucre: 'B9', baslik: 9, son: 409}
};

function kutulariSifirla(sh, c) {
  if (!sh || !c) return;
  c.sifirla.forEach(function (a) { sh.getRange(a).setValue(false); });
  if (c.secim) sh.getRange(c.secim).setValue(0);   // resim alanı da temizlenir
}

function altSatirlar(sh, gizle) {
  var a = SATIR_AYAR[sh.getName()];
  var eski = sh.getFilter();
  if (eski) eski.remove();
  sh.showRows(a.baslik + 1, a.son - a.baslik);   // önce hepsini göster
  if (!gizle) return;
  try {
    var filtre = sh.getRange('L' + a.baslik + ':L' + a.son).createFilter();
    filtre.setColumnFilterCriteria(12,
      SpreadsheetApp.newFilterCriteria().setHiddenValues(['alt']).build());
  } catch (err) {
    // filtre çalışmazsa satırları tek tek gizle (yavaş ama garanti)
    var degerler = sh.getRange('L' + (a.baslik + 1) + ':L' + a.son).getValues();
    for (var i = 0; i < degerler.length; i++) {
      if (degerler[i][0] === 'alt') sh.hideRows(a.baslik + 1 + i);
    }
  }
}

function ikiliMod(sh, mod) {
  var k = KUTU_AYAR[sh.getName()];
  if (!k) return;
  var kalin = SpreadsheetApp.BorderStyle.SOLID_THICK;
  var solK = 'C' + k.ilk + ':C' + k.son, sagK = 'E' + k.ilk + ':E' + k.son;
  var solA = 'C' + k.ana1 + ':C' + k.ana2, sagA = 'E' + k.ana1 + ':E' + k.ana2;
  var kart = 'D' + k.ilk + ':D' + k.son;
  if (mod === 'sag') {
    sh.getRange(sagK).setValues(sh.getRange(solK).getValues());
    sh.getRange(sagA).setValues(sh.getRange(solA).getValues());
    sh.getRange(solK).setValue(false);
    sh.getRange(solA).setValue(false);
    sh.showColumns(5); sh.hideColumns(3);
    sh.getRange(kart).setBorder(null, null, null, false, null, null);
  } else {
    sh.getRange(solK).setValues(sh.getRange(sagK).getValues());
    sh.getRange(solA).setValues(sh.getRange(sagA).getValues());
    sh.getRange(sagK).setValue(false);
    sh.getRange(sagA).setValue(false);
    sh.showColumns(3); sh.hideColumns(5);
    sh.getRange(kart).setBorder(null, null, null, true, null, null, '#404040', kalin);
  }
}

function onEdit(e) {
  var r = e.range, sh = r.getSheet(), ad = sh.getName();
  var c = DUZEN[ad];
  if (!c) return;
  var row = r.getRow(), col = r.getColumn();
  var a1 = r.getA1Notation();

  // 1) Düzen değiştir (B1)
  if (a1 === 'B1') {
    var secim = String(e.value);
    var g = GORUNUM[secim.replace('🔀 ', '')];
    if (!g) return;
    var hedefAd = g[0], mod = g[1];
    var hedef = e.source.getSheetByName(hedefAd);
    var h = DUZEN[hedefAd];
    if (!hedef || !h) return;
    if (hedefAd !== ad) {
      hedef.getRange(h.liste).setValue(sh.getRange(c.liste).getValue());
      hedef.getRange(h.palet).setValue(sh.getRange(c.palet).getValue());
      if (!KUTU_AYAR[ad]) r.setValue('🔀 ' + ad);
      hedef.getRange('B1').setValue(secim);
    }
    if (mod) ikiliMod(hedef, mod);
    e.source.setActiveSheet(hedef);
    return;
  }

  // 2) Alt satırları gizle / göster
  var sa = SATIR_AYAR[ad];
  if (sa && a1 === sa.hucre) {
    altSatirlar(sh, e.value === 'TRUE');
    return;
  }

  // 3) Liste (kategori) değişince kutuları sıfırla
  if (a1 === c.liste) {
    kutulariSifirla(sh, c);
  }

  // 4) B4: hepsini sıfırla
  if (a1 === 'B4' && e.value === 'TRUE') {
    kutulariSifirla(sh, c);
    r.setValue(false);
  }

  // 5) Resim: işaretlenen kutunun resmi
  if (c.secim) {
    var kelime = 0, blok = 0;
    if (ad === '4 Yan Yana' && row >= 8 && row <= 107 && [3,5,7,9].indexOf(col) !== -1) {
      kelime = row - 7 + KAYDIR;
      blok = (col - 3) / 2 + 1;
    }
    if (ad === '2x2 Kutu Solda' && row >= 8 && row <= 207 && (col === 3 || col === 5)) {
      kelime = Math.floor((row - 8) / 2) + 1 + KAYDIR;
      blok = (col === 3 ? 0 : 2) + ((row - 8) % 2) + 1;
    }
    if (ad === '2x2 Simetrik' && row >= 8 && row <= 207 && (col === 3 || col === 6)) {
      kelime = Math.floor((row - 8) / 2) + 1 + KAYDIR;
      blok = (col === 3 ? 0 : 2) + ((row - 8) % 2) + 1;
    }
    if (ad === '4li Kutu' && row >= 10 && row <= 409 && (col === 3 || col === 5)) {
      kelime = Math.floor((row - 10) / 4) + 1 + KAYDIR;
      blok = ((row - 10) % 4) + 1;
    }
    if (kelime > 0) {
      var s = sh.getRange(c.secim);
      var ilk = s.getCell(1, 1), ikinci = s.getCell(2, 1);
      if (e.value === 'TRUE') {
        ilk.setValue(kelime); ikinci.setValue(blok);
      } else if (ilk.getValue() === kelime && ikinci.getValue() === blok) {
        s.setValue(0);
      }
    }
  }

  SpreadsheetApp.flush();
  sh.autoResizeRows(c.ilk, sh.getLastRow() - c.ilk);
}
