```react
import React, { useState, useEffect, useMemo } from 'react';

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = "YOUR_SUPABASE_URL"; 
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ========================================================
// 1. DYNAMIC SA LANGUAGES & LOCALIZATION DICTIONARY
// ========================================================

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'zu', label: 'isiZulu' },
  { code: 'xh', label: 'isiXhosa' },
  { code: 'af', label: 'Afrikaans' },
  { code: 'nso', label: 'Sepedi' },
  { code: 'ts', label: 'Setswana' },
  { code: 'st', label: 'Sesotho' },
  { code: 'tsg', label: 'Xitsonga' },
  { code: 'ss', label: 'siSwati' },
  { code: 'ven', label: 'Tshivenda' },
  { code: 'nde', label: 'isiNdebele' }
];

const LOCALES = {
  en: {
    welcome: "Welcome to AURA",
    tagline: "Premium Consumer & Driver Ecosystem",
    taglineHero: "Crafting clean beauty on-demand across SA",
    taglineSub: "Seamless Sixty60 style deliveries for premium beauty products, combined with late-night campus support, and on-demand schedules with South Africa's vetted cosmetics artists.",
    shopSixty60: "Shop Sixty60",
    campusRun: "Campus Run",
    bookStylists: "Book Pros",
    aiMatcher: "AI Matcher",
    signIn: "Sign In",
    signUp: "Create Account",
    signOut: "Log Out",
    addToBag: "Add to Bag",
    bag: "Shopping Bag",
    continueAsGuest: "Continue as Guest",
    guestNotice: "Browsing in Guest Mode. Sign up or log in to add items to bag or book stylings.",
    home: "Home",
    driverHub: "Partner / Driver Hub 🛵",
    consumerApp: "Consumer App",
    payout: "Estimated Payout",
    earnings: "Active Balance",
    accRequired: "Authentication Required",
    gateDesc: "Add-to-cart, monthly subscription signups, and vetted beauty tech bookings require authentication.",
    demoBtn1: "Client Demo Login 💅🏽",
    demoBtn2: "Driver Demo Login 🛵",
    activeRiders: "Riders active near you",
    speedPolicy: "Choose Delivery Speed Policy",
    deliveryFee: "Delivery Charge",
    totalPaid: "Total Paid",
    trackingTitle: "Live Logistics Dashboard",
    trackingSub: "Simulated on-the-road tracking updates for active orders placed.",
    step1: "Assembled",
    step2: "Rider Picked",
    step3: "On the Road",
    step4: "Delivered",
    shippingPart: "Shipping Particulars",
    noActive: "No Active Deliveries",
    browseCat: "Browse Catalogue",
    calendarTitle: "Vetted Local Stylists & Techs"
  },
  zu: {
    welcome: "Siyakwamukela ku-AURA",
    tagline: "Uhlelo lwe-Premium Beauty ne-Driver",
    taglineHero: "Ukwenza ubuhle obuhlanzekile ngezikhathi zonke e-SA",
    taglineSub: "Ukuthunyelwa okusheshayo kwe-Sixty60 kwemikhiqizo yobuhle, kuhlanganiswe nosizo lwasebusuku lwasemfundweni, namahlelo nabaculi abavunyelwe.",
    shopSixty60: "Thenga u-Sixty60",
    campusRun: "Ukulethwa Kwasemfundweni",
    bookStylists: "Bhuka Ochwepheshe",
    aiMatcher: "Umsizi we-AI",
    signIn: "Ngena",
    signUp: "Vula I-Akhawunti",
    signOut: "Phuma",
    addToBag: "Faka Obhasikidini",
    bag: "Ubhasikidi Wokuthenga",
    continueAsGuest: "Qhubeka njengesivakashi",
    guestNotice: "Ubuka njengeSivakashi. Kudingeka ungene ngemvume ukuze ukhokhe noma ubhukhe.",
    home: "Ikhaya",
    driverHub: "Isizinda Somshayeli / Sabasebenzi 🛵",
    consumerApp: "Uhlelo Lomthengi",
    payout: "Inkokhelo Elindelekile",
    earnings: "Imali Ekhona",
    accRequired: "Kudingeka Ukungena",
    gateDesc: "Ukufaka obhasikidini, izikhwama zenyanga, nokubhuka ochwepheshe kudinga ungene ngemvume.",
    demoBtn1: "Ngena njengeKhasimende 💅🏽",
    demoBtn2: "Ngena njengoMshayeli 🛵",
    activeRiders: "Abashayeli bayasebenza eduze nawe",
    speedPolicy: "Khetha Isivinini Sokulethwa",
    deliveryFee: "Inkokhelo Yokulethwa",
    totalPaid: "Inani Elikhokhiwe",
    trackingTitle: "Ukulandelela Ukuthunyelwa",
    trackingSub: "Bona ukuthi isikhwama sakho siza nini kuwe ekhaya.",
    step1: "Kuhlanganisiwe",
    step2: "Kuthathwe Umshayeli",
    step3: "Alusemgaqweni",
    step4: "Lulethiwe",
    shippingPart: "Imininingwane Yokulethwa",
    noActive: "Akukho Okulethwayo Okusebenzayo",
    browseCat: "Bheka Imikhiqizo",
    calendarTitle: "Abaculi be-Cosmetics Abavunyelwe"
  },
  xh: {
    welcome: "Wamkelekile ku-AURA",
    tagline: "Inkqubo ye-Premium Beauty kunye ne-Driver",
    taglineHero: "Ukwenza ubuhle obucocekileyo ngesikhathi sonke e-SA",
    taglineSub: "Ukuhanjiswa okukhawulezileyo kwe-Sixty60 kwemveliso zobuhle, kunye nenkxaso yasebusuku yekholeji, kunye nababhuki abaqeqeshiweyo.",
    shopSixty60: "Thenga u-Sixty60",
    campusRun: "Ukuhanjiswa Kwasekholeji",
    bookStylists: "Bhukisha i-Stylist",
    aiMatcher: "Umsizi we-AI",
    signIn: "Ngena",
    signUp: "Vula I-Akhawunti",
    signOut: "Phuma",
    addToBag: "Faka eBhasikithini",
    bag: "IBhasikithi Yokuthenga",
    continueAsGuest: "Qhubeka njengondwendwe",
    guestNotice: "Ubrawuza njengolwendwendwe. Kufuneka ungene ukwenza intlawulo okanye ubhukishe.",
    home: "Ikhaya",
    driverHub: "Iziko Lomqhubi / Lomlingani 🛵",
    consumerApp: "Inkqubo YoMthengi",
    payout: "Inkokhelo Elindelekileyo",
    earnings: "Imali Ekhoyo",
    accRequired: "Kufuneka uQinisekise",
    gateDesc: "Ukuze ufake ibhasikithi, okanye ubhukishe i-stylist kufuneka ngenge-akhawunti yakho.",
    demoBtn1: "Khasimende Demo 💅🏽",
    demoBtn2: "Mqhubi Demo Login 🛵",
    activeRiders: "Abakhweli bayasebenza kufutshane nawe",
    speedPolicy: "Khetha uMgaqo-nkqubo wokuHambisa",
    deliveryFee: "Inkokhelo yokuhambisa",
    totalPaid: "Iyonke ehlawulweyo",
    trackingTitle: "UkuHanjiswa nokuHlola iParp",
    trackingSub: "Landela i-rider yakho ngexesha lokwenene.",
    step1: "Ihlanganisiwe",
    step2: "Ilandwe nguMkhweli",
    step3: "Ese-ndleleni",
    step4: "Izisiwe",
    shippingPart: "Iinkcukacha zokuHambisa",
    noActive: "Akukho kuhanjiswa kusebenzayo",
    browseCat: "Khangela ikhathalogu",
    calendarTitle: "Ii-Stylists ezivunyiweyo zalapha"
  },
  af: {
    welcome: "Welkom by AURA",
    tagline: "Premium Skoonheid- en Bestuurder-ekosisteem",
    taglineHero: "Snoei skoon skoonheid op aanvraag in SA",
    taglineSub: "Naatlose Sixty60-styl aflewerings vir premium skoonheidsprodukte, gekombineer met laatnag-kampusondersteuning en skedules met SA se beste stiliste.",
    shopSixty60: "Koop Sixty60",
    campusRun: "Kampus-aflewering",
    bookStylists: "Bespreek Stiliste",
    aiMatcher: "AI-Pasmaat",
    signIn: "Teken In",
    signUp: "Skep Rekening",
    signOut: "Teken Uit",
    addToBag: "Voeg by Sak",
    bag: "Inkoopiesak",
    continueAsGuest: "Gaan voort as gas",
    guestNotice: "U blaai as gas. Aanmelding is nodig om te betaal of te bespreek.",
    home: "Tuisblad",
    driverHub: "Bestuurder- en Vennootsentrum 🛵",
    consumerApp: "Verbruikers-app",
    payout: "Verwagte Uitbetaling",
    earnings: "Aktiewe Saldo",
    accRequired: "Verifikasie Vereis",
    gateDesc: "Voeg-by-sak en skoonheidsafsprake vereis dat jy aanmeld om sekuriteit te verseker.",
    demoBtn1: "Kliënt Demo Teken In 💅🏽",
    demoBtn2: "Bestuurder Demo Teken In 🛵",
    activeRiders: "Bestuurders aktief naby jou",
    speedPolicy: "Kies Afleweringspoed",
    deliveryFee: "Afleweringskoste",
    totalPaid: "Totaal Betaal",
    trackingTitle: "Regstreekse Logistiek-paneel",
    trackingSub: "Volg jou bestelling intyds op pad na jou huis.",
    step1: "Gepak",
    step2: "Bestuurder Gekies",
    step3: "Op die pad",
    step4: "Afgelewer",
    shippingPart: "Afleweringsbesonderhede",
    noActive: "Geen Aktiewe Aflewerings Nie",
    browseCat: "Blaai deur Katalogus",
    calendarTitle: "Goedgekeurde Plaaslike Stiliste"
  },
  nso: {
    welcome: "O amogetswe go AURA",
    tagline: "Ecosystem ya Bahlwekisi le Baotledi",
    taglineHero: "Go tšweletša botse bjo bo hlwakilego ka SA",
    taglineSub: "Dithomelo tša Sixty60 tša botse, hlakantšhitšwe le thekgo ya khamphase ya bošego le go beela bahlwekisi ba meriri.",
    shopSixty60: "Reka Sixty60",
    campusRun: "Phisego ya Khamphase",
    bookStylists: "Kwala le Setlhopha",
    aiMatcher: "Morulaganyi wa AI",
    signIn: "Tsena",
    signUp: "Hlama Akhaonte",
    signOut: "Tšwa",
    addToBag: "Tsenya ka Mokotleng",
    bag: "Mokotla wa go Reka",
    continueAsGuest: "Tšwela pele bjalo ka moeng",
    guestNotice: "O fetleka bjalo ka moeng. O swanetše go tsena gore o kgone go lefa goba go beela.",
    home: "Gae",
    driverHub: "Senthara ya Baotledi le Balekane 🛵",
    consumerApp: "Lenaneo la Bareki",
    payout: "Tuelo ye e Letetšwego",
    earnings: "Tšhelete ye e lego gona",
    accRequired: "Go hlokega Tshepedišo",
    gateDesc: "Go tsenya merwalo ka mokotleng goba go beela baetši ba meriri go hlokega tshedimošo.",
    demoBtn1: "Tsena bjalo ka moreki 💅🏽",
    demoBtn2: "Tsena bjalo ka mootledi 🛵",
    activeRiders: "Baotledi ba gona kgauswi le wena",
    speedPolicy: "Kgetha lebelo la dithomelo",
    deliveryFee: "Tuelo ya thomelo",
    totalPaid: "Tšhelete yeo e patetšwego",
    trackingTitle: "Tšhomišo ya go Latela Dithomelo",
    trackingSub: "Latela mokotla wa gago ka nako ya nnete.",
    step1: "E peakantšwe",
    step2: "E tserwe ke Mootledi",
    step3: "E tseleng",
    step4: "E fihlile",
    shippingPart: "Tshedimošo ya thomelo",
    noActive: "Ga go dithomelo tše di šomago",
    browseCat: "Fetleka katalogu",
    calendarTitle: "Batsetse ba meriri ba gae ba ba dumeletšwego"
  },
  ts: {
    welcome: "O amogetswe kwa AURA",
    tagline: "Ecosystem ya Batho le Baeteledipele",
    taglineHero: "Go dira bontle jo bo phepa mo SA",
    taglineSub: "Dithomelo tsa Sixty60 tsa dithoto tsa bontle, di kopantswe le tshegetso ya khamphase bosigo le go kwala bathusi ba meriri.",
    shopSixty60: "Reka Sixty60",
    campusRun: "Thulaganyo ya Khamphase",
    bookStylists: "Kwala le Setlhopha",
    aiMatcher: "Mothusi wa AI",
    signIn: "Tsena",
    signUp: "Ikwadise",
    signOut: "Tswa",
    addToBag: "Tsenya mo Kgetsing",
    bag: "Kgetsi ya go Reka",
    continueAsGuest: "Tswelela jaaka moeng",
    guestNotice: "O bala jaaka moeng. O tlhoka go tsena pele ga o ka duela kgotsa wa kwala.",
    home: "Gae",
    driverHub: "Senthara ya Baeteledipele 🛵",
    consumerApp: "Lenaneo la Bareki",
    payout: "Tuelo e e Solofetsweng",
    earnings: "Madi a a Leng Teng",
    accRequired: "Kano e e Tlamegileng",
    gateDesc: "Go tsenya mo kgetsing kgotsa go beela stylists go tlhoka gore o tsene mo akhaonteng.",
    demoBtn1: "Moreki Demo Tsena 💅🏽",
    demoBtn2: "Mootledi Demo Tsena 🛵",
    activeRiders: "Baotledi ba gona gaufi le wena",
    speedPolicy: "Kgetha lebelo la thumelo",
    deliveryFee: "Madi a thumelo",
    totalPaid: "Madi otlhe a a duetshweng",
    trackingTitle: "Tsela ya go Latela Thumelo",
    trackingSub: "Bona kwa thumelo ya gago e leng teng gona jaanong.",
    step1: "E rulagantswe",
    step2: "E tserwe ke Mootledi",
    step3: "E mo tseleng",
    step4: "E gorogile",
    shippingPart: "Dintlha tsa Thumelo",
    noActive: "Ga go na dithumelo tse di dirediwang",
    browseCat: "Lebella katalogu",
    calendarTitle: "Babetli ba meriri ba gae"
  },
  st: {
    welcome: "O amohetswe ho AURA",
    tagline: "Ecosystem ya Bahlwekisi le Bakhanni",
    taglineHero: "Ho etsa botle bo hlwekilego ka SA",
    taglineSub: "Dithomelo tsa Sixty60 tsa botle, di kopantswe le tshehetso ya khamphase bosiu le ho beela baetsi ba meriri ba hloahloa.",
    shopSixty60: "Reka Sixty60",
    campusRun: "Thomello ya Khamphase",
    bookStylists: "Buka Baetsi ba Meriri",
    aiMatcher: "Mothusi wa AI",
    signIn: "Kena",
    signUp: "Etsa Akhaonte",
    signOut: "Tsoa",
    addToBag: "Kenya ka Mokotleng",
    bag: "Mokotla wa ho Reka",
    continueAsGuest: "Tsoela pele joaloka moeti",
    guestNotice: "O sheba joaloka moeti. O tlameha ho kena pele o ka patala kapa wa beela.",
    home: "Lehae",
    driverHub: "Senthara ya Bakhanni le Balekane 🛵",
    consumerApp: "Lenaneo la Bareki",
    payout: "Tefo e Lebeletsoeng",
    earnings: "Tšhelete e Teng",
    accRequired: "Ho Hlokahala bopaki",
    gateDesc: "Ho kenya dintho ka mokotleng kapa ho beela litsebi tsa rona ho hloka hore o kene.",
    demoBtn1: "Kena joaloka Moreki 💅🏽",
    demoBtn2: "Kena joaloka Mokhanni 🛵",
    activeRiders: "Bakhanni ba gona haufi le wena",
    speedPolicy: "Kgetha lebelo la thomello",
    deliveryFee: "Tefo ya thomello",
    totalPaid: "Tefo yohle e entsweng",
    trackingTitle: "Tsamaiso ya ho latela thomello",
    trackingSub: "Latela bokhanni ba gago ka nako ya nnete.",
    step1: "E lokisitswe",
    step2: "E nkuwe ke Mokhanni",
    step3: "E tseleng",
    step4: "E fihlile",
    shippingPart: "Dintlha tsa thomello",
    noActive: "Ha ho na thomello e ntseng e tsoela pele",
    browseCat: "Sheba dikhetho",
    calendarTitle: "Litsebi tsa rona tsa meriri"
  },
  tsg: {
    welcome: "Amukeriwa eka AURA",
    tagline: "Ecosystem ya Vuxongi na Vaendrisi",
    taglineHero: "Ku endla vuxongi byo tenga eka SA",
    taglineSub: "Ku rhumela hi ku hatlisa ka Sixty60 ka swilo swa vuxongi, ku hlanganisiwa na nseketelo wa khamphase nivusiku na ku bhuka vativi.",
    shopSixty60: "Xava Sixty60",
    campusRun: "Khamphase Delivery",
    bookStylists: "Bhuka Stylists",
    aiMatcher: "Mupfuni wa AI",
    signIn: "Nghena",
    signUp: "Tumbuluxa Akhaonte",
    signOut: "Huma",
    addToBag: "Chela eka Nkwama",
    bag: "Nkwama wa ku Xava",
    continueAsGuest: "Yandza tanihi mupfhumba",
    guestNotice: "U browsing tanihi mupfhumba. U fanele u nghena leswaku u ta kota ku lundza kumbe ku bhuka.",
    home: "Kaya",
    driverHub: "Ntsindza wa Vaendrisi na Vakulobye 🛵",
    consumerApp: "Ntirhisano wa Vaxavi",
    payout: "Hakelo leyi Languteriweke",
    earnings: "Mali leyi Nga Kona",
    accRequired: "Vuxokoxoko bya faneleke",
    gateDesc: "Ku chela swilo eka nkwama swi lava leswaku u va u nghenile.",
    demoBtn1: "Nghena tanihi Muxavi 💅🏽",
    demoBtn2: "Nghena tanihi Muyendrisi 🛵",
    activeRiders: "Vayendrisi va kusuhi na wena",
    speedPolicy: "Hlawula rito ra ku rhumela",
    deliveryFee: "Mali ya ku rhumela",
    totalPaid: "Hinkwaswo swi hakeriweke",
    trackingTitle: "Ku landzelela loku hanyaka",
    trackingSub: "Vona lomu nkwama wa wena wu fambaka kona.",
    step1: "Swinene",
    step2: "Tseriwe hi muyendrisi",
    step3: "E ndleleni",
    step4: "Rhumeriwile",
    shippingPart: "Vuxokoxoko bya ku rhumela",
    noActive: "Kuhaliseka ku hava",
    browseCat: "Kona eka khathalogu",
    calendarTitle: "Vatshila va vuxongi va gae"
  },
  ss: {
    welcome: "Uyamukelwa ku-AURA",
    tagline: "Uhlelo lwebuhle neTisetulu",
    taglineHero: "Kwakha buhle lobuhlantekile e-SA",
    taglineSub: "Tsenga ngalokuphephile ngendlela ye-Sixty60, kuhlanganiswe netinsita tasebusuku tasemfundweni netitulu letivunyelwe.",
    shopSixty60: "Tsenga u-Sixty60",
    campusRun: "Ukuhanjiswa Kwasemfundweni",
    bookStylists: "Bhuka Tisetulu",
    aiMatcher: "Umsiti we-AI",
    signIn: "Ngena",
    signUp: "Vula I-Akhawunti",
    signOut: "Phuma",
    addToBag: "Faka Esikhwameni",
    bag: "Isikhwama Sekutsenga",
    continueAsGuest: "Chubeka njengesivakashi",
    guestNotice: "Ubuka njengesivakashi. Kufanele ungene kute ukhone kubhuka noma kutsenga.",
    home: "Ikhaya",
    driverHub: "Sikhundla seTisetulu neBakhanni 🛵",
    consumerApp: "Uhlelo lwaBaxandzi",
    payout: "Inkhokhelo Lelingelelwe",
    earnings: "Imali Lekhona",
    accRequired: "Ukuvunyelwa kuyadzingeka",
    gateDesc: "Kufaka esikhwameni noma kubhuka stylists kudzinga ungene ku-akhawunti.",
    demoBtn1: "Demo yeKhasimende 💅🏽",
    demoBtn2: "Demo yeMshayeli 🛵",
    activeRiders: "Bakhanni bayasebenta dvute nawe",
    speedPolicy: "Khetsa Isivini Sekutsenga",
    deliveryFee: "Inhlawulo yekutsenga",
    totalPaid: "Inani lelikhokhiwe",
    trackingTitle: "Kulandzela lokuphilako",
    trackingSub: "Lanzela isikhwama sakho ngesikhatsi sangempela.",
    step1: "Kupakiwe",
    step2: "Kutsatfwe ngumbhanni",
    step3: "Emseleni",
    step4: "Kuletsiwe",
    shippingPart: "Imininingwane yekutsenga",
    noActive: "Kute lokuhambako nyalo",
    browseCat: "Buka sikhwama",
    calendarTitle: "Tisebenti tetfu tetandla"
  },
  ven: {
    welcome: "Vhakhudo vha AURA",
    tagline: "Sisteme ya Vhadzudzanyi na Vhaendrisi",
    taglineHero: "U vhumba vhudi ho nakelelaho kha SA",
    taglineSub: "U rumiwa ha u hatlisa ha Sixty60 ha zwishumiswa zwa vhudi, zwo tanganyiswa na thandela dza khamphasi dza vhusiku na u buga vhadzudzanyi.",
    shopSixty60: "Renga Sixty60",
    campusRun: "Dziphurodzheki dza Khamphasi",
    bookStylists: "Buga Vhadzudzanyi",
    aiMatcher: "Muthusi wa AI",
    signIn: "Dzhena",
    signUp: "Vhumba Akhaonte",
    signOut: "Bva",
    addToBag: "Dzhenisa mbeu",
    bag: "Mbeu ya u Renga",
    continueAsGuest: "Isani phanda sa mueni",
    guestNotice: "Vhakhou brawuza sa mueni. Vha tea u dzhena u ranga u lifha kana u buga.",
    home: "Hayani",
    driverHub: "Senthara ya Vhaendrisi na Vhatshumisani 🛵",
    consumerApp: "Mbekanyamushumo ya Vhaxavi",
    payout: "Mali yo dzulwaho nayo",
    earnings: "Mali i Re Hone",
    accRequired: "Ndivho dza thaluso",
    gateDesc: "U dzhenisa mbeu kana u buga vhadzudzanyi zwi thuba u vha na akhawunte.",
    demoBtn1: "Ndivho ya Muyeni 💅🏽",
    demoBtn2: "Ndivho ya Mufambisi 🛵",
    activeRiders: "Vhafambisi vha khou famba kgauswi navho",
    speedPolicy: "Nanga luvhilo lwa u rumiwa",
    deliveryFee: "Mali ya u ruma",
    totalPaid: "Mali yothe yo lifhiwaho",
    trackingTitle: "U londa lwa nnete",
    trackingSub: "Vhonani he rumiwa yavho ya fhelela hone.",
    step1: "Zwo fhela",
    step2: "Zwo dzhia nga mufambisi",
    step3: "Zwi tseleni",
    step4: "Zwo swika",
    shippingPart: "Zwidodombedzwa zwa u ruma",
    noActive: "A huna zwothe zwi rumelwaho zwino",
    browseCat: "Sedzani khathalogu",
    calendarTitle: "Vhadzudzanyi vhashu vha hayani"
  },
  nde: {
    welcome: "Siyakwamukela ku-AURA",
    tagline: "I-Ecosystem ye-Premium Beauty namaDrayiva",
    taglineHero: "Ukwenza ubuhle obuhlwengileko e-SA",
    taglineSub: "Ukuhanjiswa kwesitayela se-Sixty60 kwemikhiqizo yobuhle, kuhlanganiswe nokusekelwa kwasebusuku kwekhamphasi kanye nabahleli abaqeqeshiweyo.",
    shopSixty60: "Thenga u-Sixty60",
    campusRun: "Ukuhanjiswa Kwekhamphasi",
    bookStylists: "Bhuka i-Stylist",
    aiMatcher: "Umsizi we-AI",
    signIn: "Ngena",
    signUp: "Vula I-Akhawunti",
    signOut: "Phuma",
    addToBag: "Faka Esikhwameni",
    bag: "Isikhwama Sokuthenga",
    continueAsGuest: "Raga njengesivakatshi",
    guestNotice: "Ubrawuza njengesivakatshi. Kumele ungene ngemvume kukhokhwe loba kubhukwe.",
    home: "Ikhaya",
    driverHub: "Iziko lamaDrayiva nabaPhathisani 🛵",
    consumerApp: "Uhlelo lwabaThengi",
    payout: "Inkokhelo Elindelekileko",
    earnings: "Imali Ekhona",
    accRequired: "Ukuqinisekiswa kuyalawulwa",
    gateDesc: "Ukufaka esikhwameni loba ukubhuka stylists kudinga ukungena.",
    demoBtn1: "Ngena njengoMthengi 💅🏽",
    demoBtn2: "Ngena njengoMshayeli 🛵",
    activeRiders: "Abatshayeli bayasebenza eduze nawe",
    speedPolicy: "Khetha Ukuhamba kweSitsha",
    deliveryFee: "Inkokhelo yokutshatshiswa",
    totalPaid: "Inani elikhokhiweko",
    trackingTitle: "Ukuronda kwesikhathi sangempela",
    trackingSub: "Ronda isikhwama sakho ngesikhathi samambala.",
    step1: "Kulungisiwe",
    step2: "Kuthathwe ngumtshayeli",
    step3: "Endleleni",
    step4: "Kuletshiwe",
    shippingPart: "Imininingwane yokuthunyelwa",
    noActive: "Akukho okuhambako gona manje",
    browseCat: "Bona isikhwama",
    calendarTitle: "Abahleli bethu bekhaya"
  }
};

// ========================================================
// 2. DATA ENGINE (PRODUCTS, CAMPAIGNS, AND BEAUTY TECHS)
// ========================================================

const REGIONS = [
  { id: 'jhb', name: 'Johannesburg (Sandton, Rosebank, Midrand)' },
  { id: 'pta', name: 'Pretoria (East, Hatfield, Centurion)' },
  { id: 'cpt', name: 'Cape Town (Sea Point, Waterfront, Stellies)' },
  { id: 'dbn', name: 'Durban (Umhlanga, Morningside)' }
];

const CAMPUSES = [
  { id: 'wits', name: 'Wits University (Braamfontein Residences, Junction)' },
  { id: 'up', name: 'University of Pretoria (Hatfield Res, Tuks Village)' },
  { id: 'uj', name: 'UJ (Auckland Park Kingsway, Sophiatown Res)' },
  { id: 'unisa', name: 'UNISA Nearby Residences (Sunnyside)' }
];

const PRODUCTS = [
  // Sixty60 Express Skincare & Cosmetics
  {
    id: 'p1',
    name: 'AURA Botanical Hydrating Elixir',
    category: 'Sixty60 Express',
    subcat: 'Skincare',
    price: 640,
    rating: 4.9,
    emoji: '🌿',
    tag: 'Best Seller',
    desc: 'Intense organic facial oil with native Kalahari melon seed extract. Restores radiance and skin elasticity.'
  },
  {
    id: 'p2',
    name: 'Estée Lauder Double Wear Foundation SPF 10',
    category: 'Sixty60 Express',
    subcat: 'Makeup',
    price: 795,
    rating: 4.8,
    emoji: '✨',
    tag: 'Trending',
    desc: '24-hour stay-in-place liquid foundation. Lightweight, oil-controlling, and highly sweat-resistant.'
  },
  {
    id: 'p3',
    name: 'Fenty Beauty Gloss Bomb Universal Lip Luminizer',
    category: 'Sixty60 Express',
    subcat: 'Makeup',
    price: 480,
    rating: 4.9,
    emoji: '💋',
    tag: 'Rihanna’s Favorite',
    desc: 'The ultimate stop-everything lip gloss. Delivers explosive shine in shade Fenty Glow.'
  },
  // Campus Late-Night Emergency Items
  {
    id: 'p4',
    name: 'Got2B Glued Waterproof Lace Wig Gel',
    category: 'Campus Run',
    subcat: 'Wig Essentials',
    price: 185,
    rating: 4.9,
    emoji: '🔥',
    tag: 'Midnight Emergency',
    desc: 'Ultimate stronghold hair gel for flawless frontal lace layups. Resists sweat, humidity, and dancefloors.'
  },
  {
    id: 'p5',
    name: 'Cantu Shea Butter Extra Hold Edge Stay Gel',
    category: 'Campus Run',
    subcat: 'Hair Care',
    price: 130,
    rating: 4.7,
    emoji: '🧴',
    tag: 'Campus Favorite',
    desc: 'Sleeks and smooths baby hairs with moisturizing pure shea butter. Non-flaking formula.'
  },
  {
    id: 'p6',
    name: 'Lil-Lets Essentials & Cramp Relief Care Pack',
    category: 'Campus Run',
    subcat: 'Emergency Care',
    price: 95,
    rating: 5.0,
    emoji: '🌸',
    tag: 'Care Package',
    desc: 'Combines organic super-absorbency pads, soothing self-heating pain relief patches, and chamomile herbal tea.'
  },
  // TikTok & K-Beauty Viral Trends
  {
    id: 'p7',
    name: 'COSRX Advanced Snail 96 Mucin Power Essence',
    category: 'TikTok & K-Beauty',
    subcat: 'Skincare',
    price: 410,
    rating: 4.9,
    emoji: '🐌',
    tag: 'TikTok Viral',
    desc: '96.3% Snail Secretion Filtrate. Protects the skin barrier while creating an otherworldly South African dewy glow.'
  },
  {
    id: 'p8',
    name: 'Beauty of Joseon Relief Sun : Rice + Probiotics',
    category: 'TikTok & K-Beauty',
    subcat: 'Skincare',
    price: 395,
    rating: 4.8,
    emoji: '☀️',
    tag: 'Holy Grail SPF',
    desc: 'Organic sunscreen with 30% rice extract. Goes on like a light cream with zero white cast or stickiness.'
  },
  {
    id: 'p9',
    name: 'E.L.F Halo Glow Liquid Filter (Premium Dupe)',
    category: 'TikTok & K-Beauty',
    subcat: 'Makeup',
    price: 350,
    rating: 4.7,
    emoji: '✨',
    tag: 'Viral Dupe',
    desc: 'Innovative glow primer-booster. A highly-rated, affordable alternative to high-end luminous glow filters.'
  }
];

const BEAUTY_PROS = [
  {
    id: 'pro1',
    name: 'Lerato M.',
    title: 'Wig Installer & Lace Customizer',
    rating: 4.9,
    reviews: 184,
    price: 600,
    emoji: '👩🏽‍🦱',
    bio: 'Specialist in custom flat lace frontals, glueless closures, and frontal maintenance. Based in Sandton/Braamfontein.',
    services: ['Flawless Lace Frontal Install (R600)', 'Glueless Wig Fitting (R400)', 'Wig Wash & Style Revamp (R350)'],
    badge: 'AURA Master Certified'
  },
  {
    id: 'pro2',
    name: 'Zama Z.',
    title: 'High-Street Glam & Bridal Makeup Artist',
    rating: 5.0,
    reviews: 240,
    price: 800,
    emoji: '💄',
    bio: 'Expert in photographic event glam and clean skin textures. Popular for Wits and UP graduation seasons.',
    services: ['Graduation Full Glam (R800)', 'Bridal Consulting & Look (R1500)', 'Soft Glam Everyday Aesthetic (R550)'],
    badge: 'Elite Top-Rated'
  },
  {
    id: 'pro3',
    name: 'Chantel N.',
    title: 'Acrylic Extension & Nail Art Queen',
    rating: 4.8,
    reviews: 112,
    price: 350,
    emoji: '💅🏽',
    bio: 'Mobile nail technician providing luxury spa acrylic overlays, abstract line-work gel art, and soft gel extensions.',
    services: ['Full Acrylic Sculptured Set with Gel Art (R350)', 'Rubber Base Builder Overlay (R250)', 'AURA Luxury Spa Gel Pedicure (R300)'],
    badge: 'On-Demand Favorite'
  }
];

// ========================================================
// 3. MAIN APP COMPONENT
// ========================================================

export default function App() {
  // Navigation & Ecosystem Role State
  const [currentAppRole, setCurrentAppRole] = useState('consumer'); 
  const [activeTab, setActiveTab] = useState('home');

  // Multi-Language and Theme State
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Authentication State
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authFormType, setAuthFormType] = useState('login'); 

  // Guest-attempted action storage to resume after login
  const [pendingAction, setPendingAction] = useState(null);

  // Sign in Form inputs
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [userRoleSelection, setUserRoleSelection] = useState('consumer');

  // Consumer Delivery State
  const [deliveryType, setDeliveryType] = useState('express'); 
  const [selectedRegion, setSelectedRegion] = useState('jhb');
  const [selectedCampus, setSelectedCampus] = useState('wits');
  const [streetAddress, setStreetAddress] = useState('8 Keyes Avenue, Rosebank');

  // Commerce & Booking State
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [orderTrackingStep, setOrderTrackingStep] = useState(0);

  // Booking Modal States
  const [bookingPro, setBookingPro] = useState(null);
  const [bookingService, setBookingService] = useState('');
  const [bookingDate, setBookingDate] = useState('2026-06-01');
  const [bookingTime, setBookingTime] = useState('14:00');

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // System Toast / Alert notifications
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Driver/Partner Simulator State
  const [driverDeliveries, setDriverDeliveries] = useState([
    {
      id: 'DEL-8842',
      customerName: 'Naledi K.',
      destination: 'Wits Junction Residence, Gate 2',
      items: 'Got2B Lace Wig Glue x1, Cantu Edge Gel x1',
      payout: 75,
      status: 'pending',
      type: 'Campus Run'
    },
    {
      id: 'DEL-9912',
      customerName: 'Sipho M.',
      destination: '44 Melrose Boulevard, Melrose Arch',
      items: 'Fenty Beauty Gloss Bomb x1',
      payout: 90,
      status: 'pending',
      type: 'Sixty60 Express'
    }
  ]);
  const [stylistSchedules, setStylistSchedules] = useState([
    {
      id: 'SCH-3012',
      customerName: 'Thando N.',
      service: 'Graduation Full Glam (R800)',
      time: 'Saturday, 10:00 AM',
      location: 'Hatfield Studios, Pretoria',
      status: 'upcoming'
    }
  ]);

  // AI Assistant Chat State
  const [aiChat, setAiChat] = useState([
    {
      role: 'assistant',
      content: "Hello, darling! 🌿 I am your **AURA AI Clean Beauty Companion**. Feel free to browse around! If you need bespoke organic skincare regimes for SA conditions, fast wig-laid remedies, or viral TikTok dupes, just ask me. (Guests can chat with me too!)"
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // RESOLVING CURRENT ACTIVE LOCALIZATION DICTIONARY
  const t = useMemo(() => {
    return LOCALES[currentLanguage] || LOCALES.en;
  }, [currentLanguage]);

  // DYNAMIC THEME CLASS MAP
  const theme = useMemo(() => {
    return {
      bg: isDarkMode ? 'bg-[#0A1110] text-[#FAF7F2]' : 'bg-[#FAF7F2] text-[#111818]',
      card: isDarkMode ? 'bg-[#12221E] border-slate-800/80 text-[#FAF7F2]' : 'bg-white border-slate-200/80 text-[#111818]',
      cardHeader: isDarkMode ? 'bg-[#152B25] text-[#FAF7F2]' : 'bg-[#FAF7F2] text-[#111818]',
      text: isDarkMode ? 'text-[#FAF7F2]' : 'text-[#111818]',
      textMuted: isDarkMode ? 'text-slate-400' : 'text-slate-500',
      accentText: isDarkMode ? 'text-[#A9CBB7]' : 'text-[#0D2C22]',
      accentBg: isDarkMode ? 'bg-[#A9CBB7]' : 'bg-[#0D2C22]',
      border: isDarkMode ? 'border-slate-800' : 'border-slate-200',
      btnPrimary: isDarkMode ? 'bg-[#A9CBB7] text-[#0A1110] hover:bg-[#c3e0cf]' : 'bg-[#0D2C22] text-white hover:bg-[#154839]',
      btnSecondary: isDarkMode ? 'bg-[#12221E] text-[#FAF7F2] border-slate-700 hover:bg-[#1c352f]' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50',
      navBg: isDarkMode ? 'bg-[#152723] border-[#1f3b35]' : 'bg-slate-100 border-slate-200',
      navBtnActive: isDarkMode ? 'bg-[#0D2C22] text-white' : 'bg-white text-[#0D2C22]',
      headerBg: isDarkMode ? 'bg-[#0A1110]/95 border-slate-800' : 'bg-[#FAF7F2]/90 border-slate-200',
      subHeaderBg: isDarkMode ? 'bg-[#12221E]/60 border-slate-800/60' : 'bg-[#F5F1E6] border-slate-200/60',
      footerBg: isDarkMode ? 'bg-[#060B0A] border-slate-900' : 'bg-[#111818] border-slate-900',
      inputBg: isDarkMode ? 'bg-[#0D1C18] border-slate-700 text-white' : 'bg-white border-slate-300 text-[#111818]',
    };
  }, [isDarkMode]);

  // UTILITY: Show notification Toast
  const triggerToast = (msg, type = 'success') => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // ========================================================
  // 4. AUTHENTICATION PROTECTION ENGINE
  // ========================================================

  const executeProtectedAction = (actionCallback) => {
    if (!currentUser) {
      setPendingAction(() => actionCallback);
      setAuthFormType('login');
      setIsAuthModalOpen(true);
      triggerToast("Please Log In or Sign Up to complete this action ✨", "info");
    } else {
      actionCallback();
    }
  };

  const handleManualLogin = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    const userProfile = {
      name: nameInput || emailInput.split('@')[0],
      email: emailInput,
      role: userRoleSelection
    };

    setCurrentUser(userProfile);
    setIsAuthModalOpen(false);
    triggerToast(`Welcome back, ${userProfile.name}! 🌿`, "success");

    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const handleManualSignup = (e) => {
    e.preventDefault();
    if (!emailInput.trim() || !nameInput.trim()) return;

    const userProfile = {
      name: nameInput,
      email: emailInput,
      role: userRoleSelection
    };

    setCurrentUser(userProfile);
    setIsAuthModalOpen(false);
    triggerToast(`Account created! Welcome to AURA, ${nameInput} ✨`, "success");

    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const handleUserSignUp = async (email, password, fullName, selectedRole) => {
  // Register the user in Supabase's secure Auth system
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) return console.error("Authentication Error:", error.message);

  // Link their profile details into your custom public profiles table
  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        { 
          id: data.user.id, 
          full_name: fullName, 
          account_type: selectedRole 
        }
      ]);
      
    if (profileError) console.error("Profile Database Error:", profileError.message);
    else alert("AURA Account Registered Successfully!");
  }
};


  const handleSignOut = () => {
    setCurrentUser(null);
    setCart([]);
    setOrders([]);
    setBookings([]);
    triggerToast("Signed out of AURA. Browsing as Guest.", "info");
    setActiveTab('home');
  };

  const continueAsGuest = () => {
    setIsAuthModalOpen(false);
    triggerToast("Continuing as Guest. Feel free to browse! 🌿", "success");
  };

  const loginPreset = (role) => {
    const profile = role === 'consumer' 
      ? { name: 'Thandiswa', email: 'thandiswa@aura.co.za', role: 'consumer' }
      : { name: 'Driver Musa', email: 'musa.rider@aura.co.za', role: 'partner' };

    setCurrentUser(profile);
    setIsAuthModalOpen(false);
    if (role === 'partner') {
      setCurrentAppRole('partner');
    } else {
      setCurrentAppRole('consumer');
    }
    triggerToast(`Logged in as ${profile.name} (${profile.role})`, "success");

    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  // ========================================================
  // 5. COMMERCE ACTIONS (PROTECTED BY GUEST CHECKS)
  // ========================================================

  const handleAddToCart = (product) => {
    executeProtectedAction(() => {
      setCart(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
          return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      triggerToast(`Added ${product.name} to your AURA bag 🛍️`);
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, amount) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    executeProtectedAction(() => {
      const deliveryFee = deliveryType === 'campus' ? 20 : 45;
      const newOrder = {
        id: `AUR-${Math.floor(10000 + Math.random() * 90000)}`,
        items: [...cart],
        subtotal: cartTotal,
        deliveryFee,
        total: cartTotal + deliveryFee,
        address: deliveryType === 'campus' 
          ? CAMPUSES.find(c => c.id === selectedCampus)?.name 
          : `${streetAddress}, ${REGIONS.find(r => r.id === selectedRegion)?.name}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Order Confirmed',
        deliveryType
      };

      const newDriverJob = {
        id: `DEL-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: currentUser?.name || 'AURA Client',
        destination: newOrder.address,
        items: cart.map(i => `${i.name} x${i.quantity}`).join(', '),
        payout: Math.floor(deliveryFee * 0.85 + 25),
        status: 'pending',
        type: deliveryType === 'campus' ? 'Campus Run' : 'Sixty60 Express'
      };

      setDriverDeliveries(prev => [newDriverJob, ...prev]);
      setOrders([newOrder, ...orders]);
      setCart([]);
      setOrderTrackingStep(1); 
      triggerToast("✨ Order successfully placed!");
      setActiveTab('tracker');
    });
  };

  const createNewCustomerOrder = async (currentUserId, mode, cost, campus = null) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      { 
        user_id: currentUserId, 
        delivery_mode: mode, 
        total_amount_zar: cost,
        campus_name: campus,
        order_status: 'Confirmed'
      }
    ])
    .select(); // Returns the created data entry row instantly

  if (error) console.error("Logistics Database Error:", error.message);
  return data[0]; // Returns order record containing the database ID tracking tracking updates
};


  const handleBookProfessional = (e) => {
    e.preventDefault();
    if (!bookingPro || !bookingService) return;

    executeProtectedAction(() => {
      const newBooking = {
        id: `BOK-${Math.floor(10000 + Math.random() * 90000)}`,
        pro: bookingPro,
        service: bookingService,
        date: bookingDate,
        time: bookingTime,
        status: 'Confirmed & Traveling',
        address: deliveryType === 'campus' 
          ? CAMPUSES.find(c => c.id === selectedCampus)?.name 
          : `${streetAddress}, ${REGIONS.find(r => r.id === selectedRegion)?.name}`
      };

      const newScheduleJob = {
        id: `SCH-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: currentUser?.name || 'AURA Client',
        service: bookingService,
        time: `${bookingDate} at ${bookingTime}`,
        location: newBooking.address,
        status: 'upcoming'
      };

      setStylistSchedules(prev => [newScheduleJob, ...prev]);
      setBookings([newBooking, ...bookings]);
      setBookingPro(null);
      setBookingService('');
      triggerToast(`📅 Stylist Session Confirmed with ${bookingPro.name}!`);
      setActiveTab('tracker');
    });
  };

  // ========================================================
  // 6. PARTNER / DRIVER PORTAL SIMULATOR ACTIONS
  // ========================================================

  const acceptDeliveryJob = (id) => {
    setDriverDeliveries(prev => prev.map(del => {
      if (del.id === id) {
        return { ...del, status: 'accepted' };
      }
      return del;
    }));
    triggerToast(`Job ${id} accepted! Navigate to store pickup now. 🛵`);
  };

  const completeDeliveryJob = (id) => {
    setDriverDeliveries(prev => prev.map(del => {
      if (del.id === id) {
        return { ...del, status: 'completed' };
      }
      return del;
    }));
    triggerToast(`Package successfully handed to customer! Earnings credited. 💰`);
  };

  const completeStylistJob = (id) => {
    setStylistSchedules(prev => prev.map(sch => {
      if (sch.id === id) {
        return { ...sch, status: 'completed' };
      }
      return sch;
    }));
    triggerToast(`Session marked completed! Customer service closed. 💅🏽`);
  };

  // Simulated delivery driver tracking incrementer
  useEffect(() => {
    let timer;
    if (orders.length > 0 && orderTrackingStep > 0 && orderTrackingStep < 4) {
      timer = setTimeout(() => {
        setOrderTrackingStep(prev => prev + 1);
      }, 10000); 
    }
    return () => clearTimeout(timer);
  }, [orders, orderTrackingStep]);

  // ========================================================
  // 7. AI BEAUTY MATCHER CHAT INTEGRATION
  // ========================================================

  const askAiSkincareAdvisor = async () => {
    if (!aiInput.trim()) return;

    const query = aiInput;
    const currentChatWithUser = [...aiChat, { role: 'user', content: query }];
    setAiChat(currentChatWithUser);
    setAiInput('');
    setIsAiLoading(true);

    const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";
    const handleAISubmit = async (userText) => 
    {if (!apiKey) 
    {
    console.error("Gemini API key is missing. Please configure a local .env file.");
    return;}
    
    // Basic security: Stop inputs longer than 500 characters to prevent spam
    if (userText.length > 500) {
    alert("Input exceeds safety thresholds.");
    return;
    }
    
    // Strip out HTML code brackets to mitigate Cross-Site Scripting (XSS)
    const sanitizedInput = userText.replace(/<[^>]*>/g, '');
    
    // Proceed with your standard Gemini API fetch call using `apiKey` and `sanitizedInput`...
    };

    const systemPrompt = `
      You are the elite AI Clean Beauty Consultant representing 'AURA' - South Africa's most prestigious green-brand beauty delivery technology.
      We operate in Johannesburg, Pretoria, Cape Town, and Durban.
      We focus on high-end organic skincare, hair formulations, wig glue support, and mobile beauty pros.
      
      The user is currently using the app in their selected official South African language: ${LANGUAGES.find(l => l.code === currentLanguage)?.label || 'English'}.
      Where possible, respond using friendly, supportive, and conversational tones matching their local culture (words like 'darling', 'choma', 'babe', 'Rands').
      Format suggestions with clean bullet points.
    `;

    const fetchWithExponentialBackoff = async (url, fetchOptions, retries = 5, backoffMs = 1000) => {
      try {
        const response = await fetch(url, fetchOptions);
        if (!response.ok) throw new Error(`API response status ${response.status}`);
        return await response.json();
      } catch (err) {
        if (retries > 0) {
          await new Promise(res => setTimeout(res, backoffMs));
          return fetchWithExponentialBackoff(url, fetchOptions, retries - 1, backoffMs * 2);
        }
        throw err;
      }
    };

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ parts: [{ text: query }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
      };

      const result = await fetchWithExponentialBackoff(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (responseText) {
        setAiChat([...currentChatWithUser, { role: 'assistant', content: responseText }]);
      } else {
        throw new Error("Empty candidate payload");
      }
    } catch (e) {
      setTimeout(() => {
        const fallback = `
### Absolutely gorgeous question! ✨
The highveld climate of Johannesburg/Pretoria can leave your skin stripped, whilst Cape Town winds present distinct challenges. Here's a bespoke routine using our AURA essentials:

1. **Intense Barrier Hydration**: Use our **AURA Botanical Hydrating Elixir** (R640). Loaded with cold-pressed Kalahari Melon seed oil, it keeps moisture locked in without heaviness.
2. **Double Shield Protection**: Layer **Beauty of Joseon Sunscreen SPF50+** (R395) to protect against intense South African UV rays with probiotics that strengthen sensitive barriers.
3. **Emergency Fix**: Laying down a new lace tonight? Secure your look with the sweat-resistant **Got2B Lace Wig Gel** from our late-night Campus Run.

Let me know if you would like me to help with anything else in your selected language! 🌿`;
        setAiChat([...currentChatWithUser, { role: 'assistant', content: fallback }]);
      }, 1200);
    } finally {
      setIsAiLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            prod.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            prod.subcat.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'All' || prod.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className={`min-h-screen ${theme.bg} font-sans flex flex-col transition-colors duration-300`}>
      
      {/* ========================================================
          AURA LUXURY TOP NEWS-TICKER
         ======================================================== */}
      <div className="bg-[#0D2C22] text-[#FAF7F2] py-2 px-4 text-center text-xs tracking-wider font-semibold border-b border-[#071F17] flex justify-center items-center gap-2">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
        <span>AURA ECOSYSTEM: 60-Minute Urban Express & 2 AM Late-Night Campus Runs (Wits, UP, UJ, UNISA)</span>
      </div>

      {/* SYSTEM TOAST DISPLAY */}
      {toast.show && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-[#0D2C22] border border-[#D1E2D3] text-[#FAF7F2] px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 transition-all">
          <span className="text-emerald-400">🌿</span>
          <span className="text-xs font-semibold uppercase tracking-wide">{toast.message}</span>
        </div>
      )}

      {/* ========================================================
          CRITICAL: INTRO GATE/AUTH SPLASH SCREEN (Gatekeepers)
         ======================================================== */}
      {!currentUser && activeTab === 'landing' && (
        <div className="fixed inset-0 z-50 bg-[#111818]/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`w-full max-w-4xl ${theme.card} rounded-3xl overflow-hidden shadow-2xl border ${theme.border} grid grid-cols-1 md:grid-cols-2`}>
            
            {/* Elegant Branding Banner Column */}
            <div className="bg-[#0D2C22] p-8 md:p-12 text-[#FAF7F2] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-950 rounded-full blur-3xl opacity-50 -z-10"></div>
              
              <div className="space-y-4">
                <div className="bg-[#FAF7F2]/10 p-2 w-fit rounded-lg border border-[#FAF7F2]/20">
                  <span className="text-2xl">👑</span>
                </div>
                <h1 className="text-4xl font-serif font-black tracking-tight leading-tight uppercase">{t.welcome}</h1>
                <p className="text-[#D1E2D3] text-sm leading-relaxed font-light">{t.taglineHero}</p>
                <p className="text-[#D1E2D3]/80 text-xs leading-relaxed font-light">{t.taglineSub}</p>
              </div>

              {/* Dynamic Theme & Lang Controller inside Gate */}
              <div className="space-y-4 pt-12">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#D1E2D3]">Ecosystem Options:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <select 
                    value={currentLanguage} 
                    onChange={(e) => setCurrentLanguage(e.target.value)}
                    className="bg-emerald-950/80 border border-[#FAF7F2]/20 text-[#FAF7F2] rounded-xl px-3 py-2 text-xs focus:outline-none"
                  >
                    {LANGUAGES.map(l => (
                      <option key={l.code} value={l.code} className="bg-[#0D2C22] text-[#FAF7F2]">{l.label}</option>
                    ))}
                  </select>
                  <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 border border-[#FAF7F2]/20 text-[#FAF7F2] p-2.5 rounded-xl text-xs flex items-center justify-center"
                    title="Toggle Light/Dark Theme"
                  >
                    {isDarkMode ? '☀️ Light' : '🌙 Dark'}
                  </button>
                </div>

                <div className="space-y-2 pt-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#D1E2D3]">Ecosystem Quick Presets:</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button 
                      onClick={() => loginPreset('consumer')}
                      className="bg-[#FAF7F2]/10 border border-[#FAF7F2]/20 hover:bg-[#FAF7F2]/20 py-2.5 px-3 rounded-xl transition-all font-semibold"
                    >
                      {t.demoBtn1}
                    </button>
                    <button 
                      onClick={() => loginPreset('partner')}
                      className="bg-[#FAF7F2]/10 border border-[#FAF7F2]/20 hover:bg-[#FAF7F2]/20 py-2.5 px-3 rounded-xl transition-all font-semibold"
                    >
                      {t.demoBtn2}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-[#D1E2D3]/60 font-medium">© 2026 AURA Beauty Delivery. Johannesburg, Pretoria, Cape Town.</p>
            </div>

            {/* Registration/Interactive Forms Column */}
            <div className="p-8 md:p-12 flex flex-col justify-between bg-inherit">
              
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">{t.accRequired}</h2>
                <p className="text-xs text-slate-500">{t.gateDesc}</p>
              </div>

              {/* Login / Sign Up Tabs */}
              <div className="my-6">
                <div className="flex border-b border-slate-200">
                  <button 
                    onClick={() => setAuthFormType('login')}
                    className={`flex-1 pb-2 text-xs font-black uppercase tracking-wider transition-all ${authFormType === 'login' ? 'border-[#0D2C22] text-[#0D2C22] border-b-2' : 'text-slate-400'}`}
                  >
                    {t.signIn}
                  </button>
                  <button 
                    onClick={() => setAuthFormType('signup')}
                    className={`flex-1 pb-2 text-xs font-black uppercase tracking-wider transition-all ${authFormType === 'signup' ? 'border-[#0D2C22] text-[#0D2C22] border-b-2' : 'text-slate-400'}`}
                  >
                    {t.signUp}
                  </button>
                </div>

                <form onSubmit={authFormType === 'login' ? handleManualLogin : handleManualSignup} className="space-y-4 pt-4">
                  {authFormType === 'signup' && (
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Thandiswa Dlamini"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className={`w-full ${theme.inputBg} rounded-xl p-3 text-xs focus:outline-none`}
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="you@example.co.za"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className={`w-full ${theme.inputBg} rounded-xl p-3 text-xs focus:outline-none`}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Secure Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className={`w-full ${theme.inputBg} rounded-xl p-3 text-xs focus:outline-none`}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-black uppercase text-slate-500 font-bold">Register Role Selection:</label>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setUserRoleSelection('consumer')}
                        className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${userRoleSelection === 'consumer' ? 'border-[#0D2C22] bg-emerald-50 text-[#0d2c22]' : 'border-slate-300 text-slate-500'}`}
                      >
                        Client / Guest 💅🏽
                      </button>
                      <button
                        type="button"
                        onClick={() => setUserRoleSelection('partner')}
                        className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${userRoleSelection === 'partner' ? 'border-[#0D2C22] bg-emerald-50 text-[#0d2c22]' : 'border-slate-300 text-slate-500'}`}
                      >
                        Driver / Stylist 🛵
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#0D2C22] text-[#FAF7F2] font-black py-3 rounded-xl transition-all text-xs uppercase tracking-widest hover:bg-[#154839]"
                  >
                    {authFormType === 'login' ? t.signIn : t.signUp}
                  </button>
                </form>
              </div>

              {/* Guest Access Alternative */}
              <div className="pt-2 text-center">
                <button 
                  onClick={() => {
                    continueAsGuest();
                    setActiveTab('home');
                  }}
                  className="text-xs text-[#0D2C22] font-bold underline hover:text-slate-900 transition-all block w-full text-center"
                >
                  {t.continueAsGuest} →
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          AURA ECOSYSTEM NAVIGATOR HEADER
         ======================================================== */}
      <header className={`sticky top-0 z-40 ${theme.headerBg} backdrop-blur-md border-b ${theme.border} py-3.5 px-4 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Accent */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-[#0D2C22] p-2.5 rounded-xl text-white shadow-md">
              <span className="text-xl font-bold">🌿</span>
            </div>
            <div>
              <h1 className="text-2xl font-serif font-black tracking-widest text-[#0D2C22]">AURA</h1>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">{t.tagline}</p>
            </div>
          </div>

          {/* DYNAMIC OPTION CONTROLLER (Language + Light/Dark mode) */}
          <div className="flex items-center gap-3 bg-[#F5F1E6]/10 p-1.5 rounded-xl border border-slate-300/40">
            {/* SA Official Language Selection */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs">🇿🇦</span>
              <select 
                value={currentLanguage} 
                onChange={(e) => {
                  setCurrentLanguage(e.target.value);
                  triggerToast(`Language switched to ${LANGUAGES.find(l => l.code === e.target.value)?.label}!`);
                }}
                className={`bg-inherit text-xs font-semibold rounded p-1 focus:outline-none border-none`}
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code} className="bg-[#0D2C22] text-white">
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="h-4 w-[1px] bg-slate-300"></div>

            {/* Light / Dark Mode Toggle Button */}
            <button 
              onClick={() => {
                setIsDarkMode(!isDarkMode);
                triggerToast(isDarkMode ? "Light Mode Engaged" : "Dark Mode Engaged");
              }}
              className="flex items-center gap-1.5 p-1 px-2.5 rounded-lg bg-[#0D2C22]/10 hover:bg-[#0D2C22]/20 transition-all text-xs font-bold"
              title="Switch light vs dark theme"
            >
              {isDarkMode ? '☀️' : '🌙'}
              <span className="hidden sm:inline">{isDarkMode ? 'Light' : 'Dark'}</span>
            </button>
          </div>

          {/* APP MODE ROLE SELECTOR */}
          <div className="flex bg-[#F5F1E6] p-1.5 rounded-xl border border-slate-200 text-xs w-full md:w-auto">
            <button 
              onClick={() => {
                setCurrentAppRole('consumer');
                triggerToast("Switched to Client view");
              }}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg font-black transition-all ${currentAppRole === 'consumer' ? 'bg-[#0D2C22] text-white' : 'text-slate-500 hover:text-slate-800'}`}
            >
              {t.consumerApp}
            </button>
            <button 
              onClick={() => {
                executeProtectedAction(() => {
                  setCurrentAppRole('partner');
                  triggerToast("Welcome Driver & Pro Hub");
                });
              }}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg font-black transition-all ${currentAppRole === 'partner' ? 'bg-[#0D2C22] text-white' : 'text-slate-500 hover:text-slate-800'}`}
            >
              {t.driverHub}
            </button>
          </div>

          {/* Site Tab selectors (Client View specific) */}
          {currentAppRole === 'consumer' && (
            <nav className={`flex items-center gap-1 ${theme.navBg} p-1 rounded-xl border w-full md:w-auto justify-around transition-colors`}>
              <button 
                onClick={() => setActiveTab('home')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'home' ? theme.navBtnActive : 'text-slate-500 hover:text-slate-800'}`}
              >
                {t.home}
              </button>
              <button 
                onClick={() => setActiveTab('shop')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'shop' ? theme.navBtnActive : 'text-slate-500 hover:text-slate-800'}`}
              >
                {t.shopSixty60}
              </button>
              <button 
                onClick={() => setActiveTab('pro-bookings')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'pro-bookings' ? theme.navBtnActive : 'text-slate-500 hover:text-slate-800'}`}
              >
                {t.bookStylists}
              </button>
              <button 
                onClick={() => setActiveTab('ai-advisor')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${activeTab === 'ai-advisor' ? theme.navBtnActive : 'text-slate-500 hover:text-slate-800'}`}
              >
                ✨ {t.aiMatcher}
              </button>
            </nav>
          )}

          {/* User Signin Profile Status or Gatekeeper signin button */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className={`flex items-center gap-3 ${theme.subHeaderBg} p-1.5 pl-3 rounded-xl border ${theme.border}`}>
                <div className="text-left text-xs">
                  <p className="font-black text-[#0D2C22]">{currentUser.name}</p>
                  <p className="text-[9px] text-slate-500 capitalize">{currentUser.role} Account</p>
                </div>
                <button 
                  onClick={handleSignOut}
                  className="bg-[#0D2C22] text-[#FAF7F2] font-semibold text-[10px] px-2.5 py-1.5 rounded-lg uppercase hover:bg-red-900 transition-all"
                >
                  {t.signOut}
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setAuthFormType('login');
                  setIsAuthModalOpen(true);
                }}
                className="bg-[#0D2C22] hover:bg-[#154839] text-[#FAF7F2] font-black text-xs px-4 py-2.5 rounded-xl uppercase tracking-widest transition-all"
              >
                {t.signIn}
              </button>
            )}
          </div>

        </div>
      </header>

      {/* ========================================================
          GUEST RESTRICTION BAR
         ======================================================== */}
      {!currentUser && (
        <div className="bg-[#D1E2D3] border-b border-[#0D2C22]/10 py-2.5 px-4 text-[#0D2C22] text-xs font-bold tracking-wide transition-colors">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
            <span className="flex items-center gap-1.5">
              💡 <span>{t.guestNotice}</span>
            </span>
            <button 
              onClick={() => {
                setAuthFormType('login');
                setIsAuthModalOpen(true);
              }}
              className="bg-[#0D2C22] text-white px-3 py-1 rounded-lg text-[10px] uppercase font-black tracking-widest hover:bg-[#154839]"
            >
              {t.signIn}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          MAIN SYSTEM VIEWS
         ======================================================== */}
      <main className="flex-grow max-w-7xl mx-auto w-full p-4">
        
        {currentAppRole === 'consumer' ? (
          /* ========================================================
              CONSUMER PORTAL
             ======================================================== */
          <div className="space-y-8 py-4">
            
            {activeTab === 'home' && (
              <div className="space-y-8 animate-fadeIn">
                
                {/* Visual Hero */}
                <div className={`relative rounded-3xl overflow-hidden bg-[#0D2C22] text-[#FAF7F2] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border ${theme.border} shadow-xl transition-colors`}>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-950 via-[#0D2C22] to-slate-950 opacity-90 -z-10"></div>

                  <div className="max-w-xl space-y-4">
                    <span className="bg-[#FAF7F2]/10 border border-[#FAF7F2]/20 text-[#D1E2D3] text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full">
                      AURA
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tight leading-tight">
                      {t.taglineHero}
                    </h2>
                    <p className="text-[#D1E2D3] text-xs md:text-sm leading-relaxed font-light">
                      {t.taglineSub}
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-grow">
                        <input 
                          type="text" 
                          placeholder="Search botanical elixir, wig glue..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && setActiveTab('shop')}
                          className="w-full bg-[#FAF7F2]/10 border border-[#FAF7F2]/20 text-[#FAF7F2] rounded-xl py-3 px-4 pl-10 text-xs focus:outline-none focus:border-[#FAF7F2]"
                        />
                        <span className="absolute left-3.5 top-3.5 text-slate-400">🔍</span>
                      </div>
                      <button 
                        onClick={() => setActiveTab('shop')}
                        className="bg-[#FAF7F2] text-[#0D2C22] font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-[#F5F1E6] transition-all"
                      >
                        {t.browseCat}
                      </button>
                    </div>
                  </div>

                  {/* Grid Preview */}
                  <div className="grid grid-cols-2 gap-3 max-w-sm w-full md:w-auto">
                    <div 
                      onClick={() => { setSelectedCategory('Sixty60 Express'); setActiveTab('shop'); }} 
                      className="bg-[#FAF7F2]/5 hover:bg-[#FAF7F2]/10 p-5 rounded-2xl border border-[#FAF7F2]/10 text-center cursor-pointer transition-all"
                    >
                      <span className="text-3xl block mb-2">🚀</span>
                      <h4 className="font-bold text-xs">{t.shopSixty60}</h4>
                      <p className="text-[9px] text-[#D1E2D3] mt-1">60-minute delivery</p>
                    </div>
                    <div 
                      onClick={() => { setSelectedCategory('Campus Run'); setActiveTab('shop'); }} 
                      className="bg-[#FAF7F2]/5 hover:bg-[#FAF7F2]/10 p-5 rounded-2xl border border-[#FAF7F2]/10 text-center cursor-pointer transition-all"
                    >
                      <span className="text-3xl block mb-2">🎓</span>
                      <h4 className="font-bold text-xs">{t.campusRun}</h4>
                      <p className="text-[9px] text-[#D1E2D3] mt-1">Midnight emergencies</p>
                    </div>
                    <div 
                      onClick={() => setActiveTab('pro-bookings')} 
                      className="bg-[#FAF7F2]/5 hover:bg-[#FAF7F2]/10 p-5 rounded-2xl border border-[#FAF7F2]/10 text-center cursor-pointer transition-all"
                    >
                      <span className="text-3xl block mb-2">💅🏽</span>
                      <h4 className="font-bold text-xs">{t.bookStylists}</h4>
                      <p className="text-[9px] text-[#D1E2D3] mt-1">Vetted Stylists</p>
                    </div>
                    <div 
                      onClick={() => setActiveTab('ai-advisor')} 
                      className="bg-[#FAF7F2]/5 hover:bg-[#FAF7F2]/10 p-5 rounded-2xl border border-[#FAF7F2]/10 text-center cursor-pointer transition-all"
                    >
                      <span className="text-3xl block mb-2">✨</span>
                      <h4 className="font-bold text-xs">{t.aiMatcher}</h4>
                      <p className="text-[9px] text-[#D1E2D3] mt-1">Bespoke matches</p>
                    </div>
                  </div>
                </div>

                {/* Local University Banner */}
                <div className={`rounded-2xl p-6 border ${theme.border} ${theme.subHeaderBg} flex flex-col md:flex-row items-center justify-between gap-6 transition-colors`}>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl bg-[#0D2C22] w-12 h-12 rounded-xl flex items-center justify-center">🎓</span>
                    <div>
                      <h3 className="font-bold text-base text-[#0D2C22]">Wits, UP, UJ, UNISA Midnight Logistics</h3>
                      <p className={`${theme.textMuted} text-xs mt-1`}>
                        Run out of Got2B lace glue or edge control before an important morning event? We run quick scooter drops straight to residences up to 2:00 AM.
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setDeliveryType('campus'); setSelectedCategory('Campus Run'); setActiveTab('shop'); }}
                    className="bg-[#0D2C22] hover:bg-[#154839] text-[#FAF7F2] text-xs font-black px-5 py-3 rounded-xl uppercase tracking-wider whitespace-nowrap transition-all"
                  >
                    {t.campusRun} ⚡
                  </button>
                </div>

                {/* Featured Products */}
                <div className="space-y-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className={`${theme.accentText} font-black text-[9px] tracking-widest uppercase`}>Hot Collections</span>
                      <h3 className={`text-2xl font-serif font-bold ${theme.text}`}>TikTok & K-Beauty Trending</h3>
                    </div>
                    <button 
                      onClick={() => { setSelectedCategory('TikTok & K-Beauty'); setActiveTab('shop'); }}
                      className={`${theme.accentText} text-xs font-black underline`}
                    >
                      {t.browseCat} →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PRODUCTS.filter(p => p.category === 'TikTok & K-Beauty').map(product => (
                      <div key={product.id} className={`${theme.card} rounded-2xl border p-5 flex flex-col justify-between group shadow-sm transition-colors`}>
                        <div>
                          <div className={`relative ${isDarkMode ? 'bg-[#152B25]' : 'bg-[#FAF7F2]'} rounded-xl h-44 flex items-center justify-center text-6xl mb-4 group-hover:scale-[1.02] transition-all`}>
                            {product.emoji}
                            <span className="absolute top-2.5 left-2.5 bg-[#0D2C22] text-white text-[9px] font-black tracking-widest px-2.5 py-1 rounded">
                              {product.tag}
                            </span>
                          </div>
                          <h4 className={`font-bold text-sm ${theme.text} mb-1`}>{product.name}</h4>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{product.subcat}</span>
                          <p className={`${theme.textMuted} text-xs mt-2 mb-4 line-clamp-3`}>{product.desc}</p>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100/10">
                          <span className="text-lg font-serif font-black">R {product.price}</span>
                          <button 
                            onClick={() => handleAddToCart(product)}
                            className="bg-[#0D2C22] hover:bg-[#154839] text-[#FAF7F2] text-xs font-black py-2 px-3 rounded-lg transition-all"
                          >
                            {t.addToBag}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vetted Pros */}
                <div className="space-y-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className={`${theme.accentText} font-black text-[9px] tracking-widest uppercase`}>AURA Go Scheduling</span>
                      <h3 className={`text-2xl font-serif font-bold ${theme.text}`}>{t.calendarTitle}</h3>
                    </div>
                    <button 
                      onClick={() => setActiveTab('pro-bookings')}
                      className={`${theme.accentText} text-xs font-black underline`}
                    >
                      {t.bookStylists} →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {BEAUTY_PROS.slice(0, 2).map(pro => (
                      <div key={pro.id} className={`${theme.card} rounded-2xl border p-5 flex flex-col sm:flex-row gap-5 shadow-sm transition-colors`}>
                        <div className={`rounded-xl w-full sm:w-24 h-24 flex items-center justify-center text-4xl shrink-0 ${isDarkMode ? 'bg-[#152B25]' : 'bg-[#FAF7F2]'}`}>
                          {pro.emoji}
                        </div>
                        <div className="space-y-2 flex-grow">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <h4 className="font-bold text-sm">{pro.name}</h4>
                            <span className="bg-[#FAF7F2] border border-slate-200 text-[#0D2C22] text-[8px] font-black px-2 py-0.5 rounded uppercase">
                              {pro.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-2">{pro.bio}</p>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-slate-400 text-xs">⭐ {pro.rating} ({pro.reviews} reviews)</span>
                            <button 
                              onClick={() => {
                                setBookingPro(pro);
                                setBookingService(pro.services[0]);
                                setActiveTab('pro-bookings');
                              }}
                              className="bg-[#0D2C22] text-[#FAF7F2] font-black text-xs py-1.5 px-3 rounded-lg hover:bg-[#154839] transition-all"
                            >
                              Book R{pro.price}+
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* CATALOGUE VIEW */}
            {activeTab === 'shop' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-serif font-black text-[#0D2C22]">{t.shopSixty60}</h3>
                    <p className={`${theme.textMuted} text-xs mt-1`}>Browse, filter, and request deliveries. (Auth required during checkout).</p>
                  </div>

                  {/* Filter Categories */}
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Sixty60 Express', 'Campus Run', 'TikTok & K-Beauty'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border transition-all ${selectedCategory === cat ? 'bg-[#0D2C22] border-[#0D2C22] text-white' : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delivery Settings bar */}
                <div className={`${theme.subHeaderBg} rounded-xl p-4 border ${theme.border} flex flex-col md:flex-row items-center justify-between gap-4 transition-colors`}>
                  
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-black text-slate-500 uppercase">Delivery Profile:</span>
                    <button 
                      onClick={() => setDeliveryType('express')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${deliveryType === 'express' ? 'bg-[#0D2C22] text-white border-[#0D2C22]' : 'bg-white text-slate-500 border-slate-200'}`}
                    >
                      🚀 Sixty60 City Courier
                    </button>
                    <button 
                      onClick={() => setDeliveryType('campus')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${deliveryType === 'campus' ? 'bg-[#0D2C22] text-white border-[#0D2C22]' : 'bg-white text-slate-500 border-slate-200'}`}
                    >
                      🎓 Student Campus Run
                    </button>
                  </div>

                  {deliveryType === 'express' ? (
                    <div className="flex items-center gap-2 text-xs w-full md:w-auto">
                      <span className="text-slate-500">Destination:</span>
                      <select 
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="bg-white text-slate-800 border border-slate-200 rounded p-1 text-xs"
                      >
                        {REGIONS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                      </select>
                      <input 
                        type="text" 
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="Street / Complex..."
                        className="bg-white text-slate-800 border border-slate-200 rounded p-1 text-xs flex-grow"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs w-full md:w-auto">
                      <span className="text-slate-500">Residence Hub:</span>
                      <select 
                        value={selectedCampus}
                        onChange={(e) => setSelectedCampus(e.target.value)}
                        className="bg-white text-slate-800 border border-slate-200 rounded p-1 text-xs"
                      >
                        {CAMPUSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                  )}

                </div>

                {/* Catalog Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <div key={product.id} className={`${theme.card} rounded-2xl border p-5 flex flex-col justify-between hover:border-[#0D2C22] transition-all group shadow-sm`}>
                      <div>
                        <div className={`relative rounded-xl h-44 flex items-center justify-center text-6xl mb-4 group-hover:scale-[1.02] transition-all ${isDarkMode ? 'bg-[#152B25]' : 'bg-[#FAF7F2]'}`}>
                          {product.emoji}
                          <span className="absolute top-2.5 left-2.5 bg-[#0D2C22]/90 text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
                            {product.category}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm mb-1">{product.name}</h4>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{product.subcat}</span>
                        <p className={`${theme.textMuted} text-xs mt-2 mb-4 line-clamp-3`}>{product.desc}</p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100/10">
                        <span className="text-lg font-serif font-black">R {product.price}</span>
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="bg-[#0D2C22] hover:bg-[#154839] text-[#FAF7F2] text-xs font-black py-2.5 px-4 rounded-xl transition-all"
                        >
                          {t.addToBag} 🛍️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* STYLIST BOOKINGS */}
            {activeTab === 'pro-bookings' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="text-[9px] font-black tracking-widest uppercase bg-[#D1E2D3] text-[#0D2C22] px-3 py-1 rounded">AURA GO Network</span>
                  <h3 className="text-3xl font-serif font-black text-[#0D2C22]">{t.calendarTitle}</h3>
                  <p className={`${theme.textMuted} text-xs`}>Vetted professional wig installers, precision nail artists, and makeup pros right to your location.</p>
                </div>

                {/* Form Overlay when Pro is selected */}
                {bookingPro && (
                  <div className={`${theme.subHeaderBg} rounded-3xl p-6 border-2 border-[#0D2C22] max-w-xl mx-auto space-y-6 transition-colors`}>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-300">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{bookingPro.emoji}</span>
                        <div>
                          <h4 className="font-bold text-sm text-[#0D2C22]">Booking Session: {bookingPro.name}</h4>
                          <p className="text-xs text-slate-500">{bookingPro.title}</p>
                        </div>
                      </div>
                      <button onClick={() => setBookingPro(null)} className="text-[#0D2C22] hover:text-red-950 font-bold text-xs">✕ Cancel</button>
                    </div>

                    <form onSubmit={handleBookProfessional} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Select Service Package:</label>
                        <select 
                          value={bookingService} 
                          onChange={(e) => setBookingService(e.target.value)}
                          className="w-full bg-white text-slate-800 border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-[#0D2C22]"
                          required
                        >
                          <option value="">-- Click to choose beauty service --</option>
                          {bookingPro.services.map((srv, idx) => (
                            <option key={idx} value={srv}>{srv}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 font-bold mb-1">Select Date:</label>
                          <input 
                            type="date" 
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full bg-white text-slate-800 border border-slate-300 rounded-xl p-3"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-1">Select Time Slot:</label>
                          <input 
                            type="time" 
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            className="w-full bg-white text-slate-800 border border-slate-300 rounded-xl p-3"
                            required
                          />
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-lg text-[10px] text-slate-600 border border-[#D1E2D3]">
                        🌿 Standard distance charges are included. Your stylist will travel directly to the designated client address: 
                        <strong className="block text-[#0D2C22] mt-1">
                          {deliveryType === 'campus' 
                            ? CAMPUSES.find(c => c.id === selectedCampus)?.name 
                            : `${streetAddress}, ${REGIONS.find(r => r.id === selectedRegion)?.name}`}
                        </strong>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-[#0D2C22] text-[#FAF7F2] font-black uppercase tracking-widest py-3 rounded-xl hover:bg-[#154839] transition-all"
                      >
                        Confirm Stylist Appointment (R {bookingPro.price}+)
                      </button>
                    </form>
                  </div>
                )}

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {BEAUTY_PROS.map(pro => (
                    <div key={pro.id} className={`${theme.card} rounded-2xl border p-5 flex flex-col justify-between shadow-sm transition-colors`}>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className={`text-4xl w-12 h-12 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-[#152B25]' : 'bg-[#FAF7F2]'}`}>{pro.emoji}</span>
                          <div>
                            <h4 className="font-bold text-sm">{pro.name}</h4>
                            <p className="text-xs text-slate-400 font-medium">{pro.title}</p>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">{pro.bio}</p>

                        <div className={`p-3 rounded-xl border ${theme.border} text-xs space-y-1.5 ${isDarkMode ? 'bg-[#152B25]' : 'bg-[#FAF7F2]'}`}>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Available Treatments:</span>
                          {pro.services.map((srv, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                              <span className="text-emerald-500">✔</span> <span>{srv}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100/10 mt-4">
                        <div>
                          <p className="text-[9px] text-slate-400 uppercase font-black">Base Appointment Rate</p>
                          <p className="text-base font-serif font-black">R {pro.price}</p>
                        </div>
                        <button 
                          onClick={() => {
                            setBookingPro(pro);
                            setBookingService(pro.services[0]);
                          }}
                          className="bg-[#0D2C22] text-white font-black text-xs py-2 px-4 rounded-xl hover:bg-[#154839]"
                        >
                          Book Now 💅🏽
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* AI SYSTEM ADVISOR CHAT VIEW */}
            {activeTab === 'ai-advisor' && (
              <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
                <div className="bg-[#0D2C22] rounded-2xl p-6 text-[#FAF7F2] border border-[#071F17] flex justify-between items-center gap-4">
                  <div className="space-y-1">
                    <span className="bg-[#FAF7F2]/10 border border-[#FAF7F2]/20 text-[#D1E2D3] text-[9px] font-black uppercase px-2.5 py-1 rounded">Intelligent Matcher</span>
                    <h3 className="text-xl font-serif font-bold">AURA Organic Skin Expert</h3>
                    <p className="text-[#D1E2D3]/80 text-xs">Dynamic matching tailored to SA climates and official languages!</p>
                  </div>
                  <span className="text-5xl">🌿</span>
                </div>

                <div className={`${theme.card} rounded-2xl border h-[450px] flex flex-col justify-between overflow-hidden shadow-sm transition-colors`}>
                  
                  {/* Messages container */}
                  <div className="p-4 overflow-y-auto space-y-4 flex-grow text-xs leading-relaxed">
                    {aiChat.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl p-4 border ${msg.role === 'user' ? 'bg-[#0D2C22] text-[#FAF7F2] border-[#0D2C22] rounded-tr-none' : 'bg-[#F5F1E6] border-slate-200 text-[#111818] rounded-tl-none'}`}>
                          <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">
                            {msg.role === 'user' ? 'You' : 'Aura Clean Consultant 👑'}
                          </p>
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                    ))}

                    {isAiLoading && (
                      <div className="flex justify-start">
                        <div className="bg-[#F5F1E6] border-slate-200 max-w-[85%] rounded-2xl p-4 rounded-tl-none animate-pulse">
                          <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Aura Clean Consultant</p>
                          <p className="text-xs">Formulating botanical matches... 🌿</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input form */}
                  <div className={`p-3 border-t border-slate-100/10 ${theme.cardHeader} flex items-center gap-2`}>
                    <input 
                      type="text" 
                      placeholder="Ask about hydration regimes for Johannesburg dry heat..."
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && askAiSkincareAdvisor()}
                      className={`flex-grow ${theme.inputBg} rounded-xl py-2.5 px-4 text-xs focus:outline-none`}
                    />
                    <button 
                      onClick={askAiSkincareAdvisor}
                      className="bg-[#0D2C22] text-[#FAF7F2] font-black text-xs px-4 py-2.5 rounded-xl uppercase tracking-wider"
                    >
                      Ask AI
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* LIVE DELIVERIES ORDER TRACKER */}
            {activeTab === 'tracker' && (
              <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
                <div className="text-center space-y-2">
                  <span className="bg-[#D1E2D3] text-[#0D2C22] font-black text-[9px] uppercase px-3 py-1 rounded">Live Logistics Dashboard</span>
                  <h3 className="text-2xl font-serif font-black">{t.trackingTitle}</h3>
                  <p className={`${theme.textMuted} text-xs`}>{t.trackingSub}</p>
                </div>

                {orders.length > 0 ? (
                  <div className={`${theme.card} rounded-3xl p-6 border space-y-6 shadow-sm transition-colors`}>
                    
                    {/* Head */}
                    <div className="flex justify-between items-center border-b border-slate-100/10 pb-4">
                      <div>
                        <h4 className="font-bold text-sm">Order reference: {orders[0].id}</h4>
                        <p className="text-[9px] text-slate-400">Departed at: {orders[0].time} • Type: {orders[0].deliveryType === 'campus' ? 'Midnight Campus run' : 'Sixty60 Express'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-slate-400 uppercase font-bold">{t.totalPaid}</p>
                        <p className="text-base font-black text-[#0D2C22]">R {orders[0].total}</p>
                      </div>
                    </div>

                    {/* Progress slider bar */}
                    <div className="relative pt-6">
                      <div className="absolute top-10 left-3 right-3 h-1 bg-slate-100/25"></div>
                      <div 
                        className="absolute top-10 left-3 h-1 bg-[#0D2C22] transition-all duration-1000"
                        style={{ width: `${(orderTrackingStep / 4) * 100}%` }}
                      ></div>

                      <div className="grid grid-cols-4 text-center text-xs gap-2">
                        <div className="space-y-1">
                          <span className={`w-8 h-8 rounded-full border-2 font-black mx-auto flex items-center justify-center ${orderTrackingStep >= 1 ? 'bg-[#0D2C22] border-[#0D2C22] text-white' : 'bg-white border-slate-200 text-slate-300'}`}>1</span>
                          <p className="font-bold">{t.step1}</p>
                        </div>
                        <div className="space-y-1">
                          <span className={`w-8 h-8 rounded-full border-2 font-black mx-auto flex items-center justify-center ${orderTrackingStep >= 2 ? 'bg-[#0D2C22] border-[#0D2C22] text-white' : 'bg-white border-slate-200 text-slate-300'}`}>2</span>
                          <p className="font-bold">{t.step2}</p>
                        </div>
                        <div className="space-y-1">
                          <span className={`w-8 h-8 rounded-full border-2 font-black mx-auto flex items-center justify-center ${orderTrackingStep >= 3 ? 'bg-[#0D2C22] border-[#0D2C22] text-white' : 'bg-white border-slate-200 text-slate-300'}`}>3</span>
                          <p className="font-bold">{t.step3}</p>
                        </div>
                        <div className="space-y-1">
                          <span className={`w-8 h-8 rounded-full border-2 font-black mx-auto flex items-center justify-center ${orderTrackingStep >= 4 ? 'bg-[#0D2C22] border-[#0D2C22] text-white' : 'bg-white border-slate-200 text-slate-300'}`}>4</span>
                          <p className="font-bold">{t.step4}</p>
                        </div>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className={`p-4 rounded-xl border ${theme.border} text-xs space-y-2 ${isDarkMode ? 'bg-[#152B25]' : 'bg-[#FAF7F2]'}`}>
                      <h5 className="font-bold text-[#0D2C22]">📍 {t.shippingPart}</h5>
                      <p className={`${theme.textMuted}`}>Drop-off destination: <strong className="text-slate-800 dark:text-slate-200">{orders[0].address}</strong></p>
                      <p className={`${theme.textMuted}`}>Simulated speed: <strong className="text-slate-800 dark:text-slate-200">{orders[0].deliveryType === 'campus' ? 'Midnight student express gateway' : '60-minute Sandton scooter route'}</strong></p>
                    </div>

                  </div>
                ) : (
                  <div className={`${theme.card} rounded-3xl p-12 text-center border max-w-sm mx-auto space-y-3 transition-colors`}>
                    <span className="text-5xl block">🛵</span>
                    <h4 className="font-bold">{t.noActive}</h4>
                    <p className={`${theme.textMuted} text-xs`}>Fill up your AURA bag and check out to see the delivery tracking simulations.</p>
                    <button onClick={() => setActiveTab('shop')} className="bg-[#0D2C22] text-white px-4 py-2 rounded-xl text-xs uppercase font-black">{t.browseCat}</button>
                  </div>
                )}

              </div>
            )}

          </div>
        ) : (
          /* ========================================================
              DRIVER & BEAUTY PRO PARTNER PORTAL
             ======================================================== */
          <div className="space-y-8 py-4 animate-fadeIn">
            
            <div className="bg-[#0D2C22] text-[#FAF7F2] rounded-3xl p-8 border border-slate-900 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-2">
                <span className="bg-[#FAF7F2]/10 border border-[#FAF7F2]/20 text-[#D1E2D3] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  Partner Portal
                </span>
                <h3 className="text-3xl font-serif font-bold">AURA Partner & Driver Hub</h3>
                <p className="text-[#D1E2D3]/90 text-xs">Simulated Driver Delivery route assignments and Stylist custom calendars.</p>
              </div>
              <div className="bg-[#FAF7F2] text-[#0D2C22] p-4 rounded-2xl text-center shadow-md">
                <p className="text-[10px] uppercase font-black text-slate-500">{t.earnings}</p>
                <p className="text-2xl font-black">R 1,420.00</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-[#0D2C22] flex items-center gap-2">
                  <span>🛵</span> Scooter On-Demand Assignments
                </h4>

                {driverDeliveries.map((del, idx) => (
                  <div key={idx} className={`${theme.card} rounded-2xl p-5 border space-y-3 shadow-sm transition-colors`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-black tracking-widest uppercase bg-[#FAF7F2] text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                          {del.type}
                        </span>
                        <h5 className="font-bold text-sm mt-1">Client: {del.customerName}</h5>
                        <p className={`${theme.textMuted} text-xs mt-1`}>Destination: {del.destination}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{t.payout}</p>
                        <p className="text-sm font-black">R {del.payout}</p>
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg border ${theme.border} text-xs ${isDarkMode ? 'bg-[#152B25]' : 'bg-[#FAF7F2]'}`}>
                      <span className="text-slate-400 font-bold uppercase text-[9px] block">Items in Shipment:</span>
                      <p className="font-semibold">{del.items}</p>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100/10">
                      {del.status === 'pending' ? (
                        <button 
                          onClick={() => acceptDeliveryJob(del.id)}
                          className="bg-[#0D2C22] hover:bg-[#154839] text-white text-xs font-black uppercase tracking-wider py-2 px-4 rounded-xl transition-all"
                        >
                          Accept Assignment 🛵
                        </button>
                      ) : del.status === 'accepted' ? (
                        <button 
                          onClick={() => completeDeliveryJob(del.id)}
                          className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-wider py-2 px-4 rounded-xl transition-all"
                        >
                          Mark Completed ✔
                        </button>
                      ) : (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded">
                          Completed & Credited
                        </span>
                      )}
                    </div>

                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-lg text-[#0D2C22] flex items-center gap-2">
                  <span>💅🏽</span> Beauty Professional Calendars
                </h4>

                {stylistSchedules.map((sch, idx) => (
                  <div key={idx} className={`${theme.card} rounded-2xl p-5 border space-y-3 shadow-sm transition-colors`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-bold text-sm">{sch.service}</h5>
                        <p className="text-xs text-slate-500 mt-1">Client Name: {sch.customerName}</p>
                        <p className="text-xs text-slate-400">Scheduled: {sch.time}</p>
                      </div>
                      <div>
                        <span className={`text-[9px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded ${sch.status === 'upcoming' ? 'bg-[#D1E2D3] text-[#0D2C22]' : 'bg-slate-200 text-slate-400'}`}>
                          {sch.status}
                        </span>
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg border ${theme.border} text-xs ${isDarkMode ? 'bg-[#152B25]' : 'bg-[#FAF7F2]'}`}>
                      <span className="text-slate-400 font-bold uppercase text-[9px] block">Travel Address Destination:</span>
                      <p className="font-medium">{sch.location}</p>
                    </div>

                    {sch.status === 'upcoming' && (
                      <div className="flex justify-end pt-2">
                        <button 
                          onClick={() => completeStylistJob(sch.id)}
                          className="bg-[#0D2C22] hover:bg-[#154839] text-white text-xs font-black uppercase tracking-wider py-2 px-4 rounded-xl transition-all"
                        >
                          Mark Completed ✔
                        </button>
                      </div>
                    )}

                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

      </main>

      {/* ========================================================
          CRITICAL MODAL: MANUAL AUTH (LOGIN & SIGNUP GATE)
         ======================================================== */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md ${theme.card} rounded-3xl overflow-hidden shadow-2xl border ${theme.border} p-6 space-y-6 transition-colors`}>
            
            <div className="flex justify-between items-center pb-3 border-b border-slate-200/10">
              <h4 className="font-serif font-black text-lg text-[#0D2C22]">{t.accRequired}</h4>
              <button 
                onClick={() => {
                  setIsAuthModalOpen(false);
                  setPendingAction(null);
                }} 
                className="text-slate-500 hover:text-red-900 font-bold text-xs"
              >
                ✕ Cancel
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              {t.gateDesc}
            </p>

            <div className="space-y-2">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Quick Demo Logins:</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button 
                  onClick={() => loginPreset('consumer')}
                  className="bg-[#D1E2D3] border border-[#0D2C22]/10 text-[#0D2C22] py-2 px-3 rounded-xl transition-all font-semibold"
                >
                  {t.demoBtn1}
                </button>
                <button 
                  onClick={() => loginPreset('partner')}
                  className="bg-[#D1E2D3] border border-[#0D2C22]/10 text-[#0D2C22] py-2 px-3 rounded-xl transition-all font-semibold"
                >
                  {t.demoBtn2}
                </button>
              </div>
            </div>

            <div className="flex border-b border-slate-200 text-xs">
              <button 
                onClick={() => setAuthFormType('login')}
                className={`flex-1 pb-2 font-black uppercase transition-all ${authFormType === 'login' ? 'border-[#0D2C22] text-[#0D2C22] border-b-2' : 'text-slate-400'}`}
              >
                {t.signIn}
              </button>
              <button 
                onClick={() => setAuthFormType('signup')}
                className={`flex-1 pb-2 font-black uppercase transition-all ${authFormType === 'signup' ? 'border-[#0D2C22] text-[#0D2C22] border-b-2' : 'text-slate-400'}`}
              >
                {t.signUp}
              </button>
            </div>

            <form onSubmit={authFormType === 'login' ? handleManualLogin : handleManualSignup} className="space-y-4 text-xs">
              {authFormType === 'signup' && (
                <div>
                  <label className="block text-[9px] font-bold uppercase text-slate-400 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Thandiswa Dlamini"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className={`w-full ${theme.inputBg} rounded-xl p-3`}
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-[9px] font-bold uppercase text-slate-400 mb-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="you@example.co.za"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className={`w-full ${theme.inputBg} rounded-xl p-3`}
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#0D2C22] text-white font-black py-3 rounded-xl uppercase tracking-widest hover:bg-[#154839] transition-all"
              >
                {authFormType === 'login' ? t.signIn : t.signUp}
              </button>
            </form>

            <div className="text-center">
              <button 
                onClick={() => {
                  setIsAuthModalOpen(false);
                  setPendingAction(null);
                }}
                className="text-slate-400 underline hover:text-slate-600 text-xs block mx-auto"
              >
                {t.continueAsGuest}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          AURA SHOPPING BAG DRAWER OVERLAY
         ======================================================== */}
      {currentAppRole === 'consumer' && cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0D2C22] text-[#FAF7F2] p-4 shadow-2xl border-t border-[#071F17] animate-slideUp">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <span className="text-3xl">🛍️</span>
              <div>
                <h4 className="font-bold text-sm">{t.bag}</h4>
                <p className="text-[11px] text-[#D1E2D3]">
                  {cart.reduce((a, b) => a + b.quantity, 0)} items • Delivery: <strong className="uppercase">{deliveryType}</strong>
                </p>
              </div>
            </div>

            <div className="hidden lg:flex gap-2">
              {cart.map(item => (
                <span key={item.id} className="bg-[#FAF7F2]/10 border border-[#FAF7F2]/10 text-xs px-2.5 py-1 rounded-lg">
                  {item.emoji} {item.name} (x{item.quantity})
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div>
                <p className="text-[9px] text-[#D1E2D3] uppercase font-bold">Subtotal</p>
                <p className="text-lg font-serif font-black">R {cartTotal}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCart([])}
                  className="bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 border border-[#FAF7F2]/20 text-[#FAF7F2] text-xs font-black uppercase tracking-wider py-2 px-3 rounded-xl transition-all"
                >
                  Clear Bag
                </button>
                <button 
                  onClick={handlePlaceOrder}
                  className="bg-[#FAF7F2] hover:bg-[#F5F1E6] text-[#0D2C22] text-xs font-black uppercase tracking-wider py-2.5 px-5 rounded-xl transition-all"
                >
                  Place Delivery Order →
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          AURA LUXURY FOOTER
         ======================================================== */}
      <footer className={`${theme.footerBg} text-[#FAF7F2] py-12 px-4 mt-12 border-t border-slate-900 transition-colors`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-light">
          
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-lg tracking-widest text-[#D1E2D3] uppercase">AURA</h4>
            <p className="text-slate-400 leading-relaxed">
              Consolidating premium South African cosmetics logistics. Formulated for highveld winters and ocean humidity drops.
            </p>
            <p className="text-slate-500 text-[10px]">Active Hubs: JHB, Pretoria East, Sea Point, Durban Umhlanga</p>
          </div>

          <div className="space-y-3">
            <h5 className="font-black text-slate-200 uppercase tracking-widest text-[9px]">Ecosystem Links</h5>
            <div className="grid grid-cols-2 gap-2 text-slate-400">
              <button onClick={() => { setCurrentAppRole('consumer'); setActiveTab('home'); }} className="text-left hover:text-white">Client Portal</button>
              <button onClick={() => { setCurrentAppRole('consumer'); setActiveTab('shop'); }} className="text-left hover:text-white">{t.shopSixty60}</button>
              <button onClick={() => { setCurrentAppRole('consumer'); setActiveTab('pro-bookings'); }} className="text-left hover:text-white">{t.bookStylists}</button>
              <button onClick={() => { executeProtectedAction(() => setCurrentAppRole('partner')); }} className="text-left hover:text-white">Driver Assigned Gigs</button>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="font-black text-slate-200 uppercase tracking-widest text-[9px]">AURA Operations</h5>
            <p className="text-slate-400">Vetted drivers and cosmetics practitioners can register accounts to verify credentials.</p>
            <p className="text-[10px] text-slate-500 font-medium">© 2026 AURA Inc. All Rights Reserved.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}

```
