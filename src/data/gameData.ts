export interface QuestionData {
  id: string;
  title: string;
  subtitle: string;
  optionA: {
    label: string;
    value: string;
    insultTitle: string;
    roasts: string[];
    theory: string;
  };
  optionB: {
    label: string;
    value: string;
    insultTitle: string;
    roasts: string[];
    theory: string;
  };
}

export const MAIN_QUESTION: QuestionData = {
  id: 'one-plus-one',
  title: '1 + 1 = ?',
  subtitle: 'Dünyanın en basit sorusu. Dikkatli seç, sakın rezil olma...',
  optionA: {
    label: '2',
    value: '2',
    insultTitle: 'APTAL!',
    roasts: [
      'YANLIŞ! Aptal mısın sen?! 1 ile 1 yan yana duruyor! "1" + "1" = "11" eder! Metin birleştirmeden (concatenation) bihabersin salak herif!',
      'Salak! İlkokul 1\'de misin sen?! 1\'in yanına 1 koyarsan 11 olur! Hangi ilkel mantıkla 2 dedin ahmak?!',
      'Aptal! Burası ters psikoloji oyunu, sana ilkokul matematik testi mi çözdürüyoruz gerizekalı?!',
      'Beynini peynir ekmekle mi yedin salak?! 1+1=2 diyenler taş devrinde kaldı, devir string devri ahmak!',
      'Aptal! 1 elmanın yanına 1 elma koyunca ne olur? Yan yana iki elma, yani 11! Düşünme yetin nerede salak?!'
    ],
    theory: 'Matematiksel Teori: İki tane 1 karakteri yan yana geldiğinde evrensel string kuralı gereği 11 oluşturur. 2 diyenler ilkel hesap makinesi kafasındadır.'
  },
  optionB: {
    label: '11',
    value: '11',
    insultTitle: 'GERİZEKALI!',
    roasts: [
      'YANLIŞ! Gerizekalı mısın sen?! 1 ile 1 toplanınca 2 eder! Matematik profesörü mü kesildin başımıza ahmak herif?!',
      'Ahmak! Kafanın içinde JavaScript motoru mu çalışıyor salak?! Sayı saymayı da mı unuttun gerizekalı?!',
      'Salak! "Kesin ters psikolojidir, 11\'dir" diye zekilik tasladın değil mi aptal?! Al sana ters köşe ahmak!',
      'Gerizekalı! Yan yana koyunca 11 edermiş... Bir de gururla tıkladı salak, hiç mi utanmadın?!',
      'Ahmak! İlkokul öğretmenine yazıklar olsun, 1 ile 1\'in 2 ettiğini bile öğrenememişsin gerizekalı!'
    ],
    theory: 'Aritmetik Teori: Temel Peano aksiyomlarına göre 1 + 1 kesinlikle 2\'dir. 11 diyenler aşırı düşünen zavallı kurbanlardır.'
  }
};

export const BONUS_QUESTIONS: QuestionData[] = [
  {
    id: 'chicken-egg',
    title: 'Tavuk mu yumurtadan çıkar, yumurta mı tavuktan?',
    subtitle: 'Felsefenin kadim sorusu. Cevap ver de görelim...',
    optionA: {
      label: 'Tavuk',
      value: 'tavuk',
      insultTitle: 'SALAK!',
      roasts: [
        'YANLIŞ! Salak mısın sen?! Yumurta olmadan tavuk gökten zembille mi indi aptal herif?!',
        'Ahmak! Tavuk diyerek biyolojiye hakaret ettin gerizekalı!',
        'Salak! Tabii ki yumurta olacaktı... Gerçi o da yanlış ahmak, horozdan çıkar!'
      ],
      theory: 'Evrimsel Çöküş: Tavuk dediğin an dinozorlar mezarında ters döner.'
    },
    optionB: {
      label: 'Yumurta',
      value: 'yumurta',
      insultTitle: 'AHMAK!',
      roasts: [
        'YANLIŞ! Gerizekalı mısın?! O yumurtayı kim yumurtladı ahmak, bakkal Hasan amca mı?!',
        'Aptal! Tavuk yoksa o yumurta nereden geldi salak, uzaylılar mı bıraktı?!',
        'Ahmak! Çok bilimsel takıldın güya, patladın gerizekalı!'
      ],
      theory: 'Ontolojik Hata: Yumurtayı sahiplenen tavuk yoksa yumurta sadece omlettir.'
    }
  },
  {
    id: 'earth-shape',
    title: 'Dünya düz müdür, yuvarlak mı?',
    subtitle: 'Uzay çağından basit bir soru daha...',
    optionA: {
      label: 'Düz',
      value: 'duz',
      insultTitle: 'GERİZEKALI!',
      roasts: [
        'YANLIŞ! Gerizekalı! Orta çağda mısın ahmak herif, tepsi mi bu?!',
        'Salak! Kenarından aşağı düşmedin mi hâlâ aptal?!',
        'Ahmak! Düz diyen beyin kıvrımın da düzleşmiş besbelli gerizekalı!'
      ],
      theory: 'Kozmolojik Facia: Düz diyenin aklı yerçekimine meydan okur.'
    },
    optionB: {
      label: 'Yuvarlak',
      value: 'yuvarlak',
      insultTitle: 'APTAL!',
      roasts: [
        'YANLIŞ! Aptal! Dünya tam yuvarlak değil GEOİTTİR salak!',
        'Ahmak! Kutuplardan basık, ekvatordan şişkin geoiti bilmeyen gerizekalı!',
        'Salak! Top gibi yuvarlak sanıyor dünyayı, futbol topu mu bu ahmak?!'
      ],
      theory: 'Jeodezik Cehalet: Yuvarlak diyen kutup basıklığını hiçe sayan bir cahildir.'
    }
  },
  {
    id: 'two-times-two',
    title: '2 x 2 kaçtır?',
    subtitle: 'Çarpım tablosunun zirvesi...',
    optionA: {
      label: '4',
      value: '4',
      insultTitle: 'SALAK!',
      roasts: [
        'YANLIŞ! Salak herif! 2 tane 2 yan yana gelince 22 eder ahmak!',
        'Aptal! 4 dediğin şey anaokulu masalı, modern dünyada 22 eder gerizekalı!',
        'Salak! Hâlâ ders almadın mı aptal, düz mantıkla nereye kadar?!'
      ],
      theory: 'Kombinatorik Hata: 2 ile 2 çarpışınca 4 değil kaos çıkar.'
    },
    optionB: {
      label: '22',
      value: '22',
      insultTitle: 'AHMAK!',
      roasts: [
        'YANLIŞ! Ahmak! Çarpma işlemi yapıyoruz string yapıştırmıyoruz gerizekalı!',
        'Gerizekalı! 2x2 nasıl 22 etsin salak, beynini kargoya mı verdin?!',
        'Aptal! Önceki soruda string dedik diye bunda da atladın sazan gibi ahmak!'
      ],
      theory: 'Operatör Çelişkisi: Çarpı işaretini görmeyen gözlerin muayeneye ihtiyacı var.'
    }
  }
];

export const TROLL_INSULTS = ['APTAL', 'GERİZEKALI', 'AHMAK', 'SALAK'];

export const STAGES = [
  { count: 1, rank: 'Acemi Kurban', iq: 85, color: 'text-lime-400' },
  { count: 2, rank: 'İnatçı Salak', iq: 40, color: 'text-amber-400' },
  { count: 3, rank: 'Kronik Ahmak', iq: -15, color: 'text-orange-500' },
  { count: 4, rank: 'Tescilli Gerizekalı', iq: -180, color: 'text-red-500' },
  { count: 5, rank: 'Tedavi Edilemez Ağır Vaka', iq: -450, color: 'text-red-600' },
  { count: 7, rank: 'Galaktik Aptallık Şampiyonu', iq: -999, color: 'text-rose-500' },
  { count: 10, rank: 'Ters Psikoloji Esiri (0 Beyin Hücresi)', iq: -9999, color: 'text-red-400' },
];

export const DESPAIR_BUTTONS = [
  {
    id: 'itiraz',
    label: '⚖️ Hile var, itiraz ediyorum!',
    responseTitle: 'İTİRAZ REDDEDİLDİ!',
    responseMsg: 'Yüce Ahmaklar Mahkemesi itirazını inceledi ve oy birliğiyle %100 GERİZEKALI olduğuna karar verdi salak!'
  },
  {
    id: 'dogru_nerede',
    label: '❓ Peki doğru cevap nerede?!',
    responseTitle: 'DOĞRU CEVAP YOK Kİ!',
    responseMsg: 'Oyunun adı TERS PSİKOLOJİ gerizekalı! Hangi şıkkı seçersen seç daima YANLIŞ çıkacaksın ahmak!'
  },
  {
    id: 'pencere',
    label: '🪟 Bence cevap 1+1 = Pencere!',
    responseTitle: 'ANAOKULU ESPRİSİ!',
    responseMsg: 'Aferin 5 yaşındaki anaokulu esprisini yaptın salak! Yine YANLIŞ, tebrikler aptal!'
  },
  {
    id: 'israr',
    label: '🔥 Ben cevabımdan eminim!',
    responseTitle: 'BOŞ GURUR!',
    responseMsg: 'Emin olman senin ahmak olduğun gerçeğini değiştirmiyor gerizekalı! Yanlış yanlış kalacaktır!'
  }
];
