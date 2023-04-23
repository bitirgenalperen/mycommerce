const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Item = require("./models/item");
dotenv.config();
const MONGO_DB_URI = process.env.MONGO_DB_URI;

mongoose.connect(MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log(`mongoDB connected!`);
})
.catch((err) => {
  console.error(err.message);
});


const itemList = [
    {    
      name: "Men's Casual T-Shirt",    
      description: "Comfortable and stylish t-shirt for everyday wear.",    
      price: 29.99,    
      size: "Large",    
      color: "Black",    
      article: "clothing",
      image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.dsmcdn.com%2Fty333%2Fproduct%2Fmedia%2Fimages%2F20220217%2F9%2F51552796%2F15730139%2F8%2F8_org_zoom.jpg&tbnid=WiG0klYQSt_zfM&vet=12ahUKEwjCxeavrb3-AhV8gv0HHbJoA7QQMygAegUIARCvAQ..i&imgrefurl=https%3A%2F%2Fwww.trendyol.com%2Fen%2Ftrendyol-collection%2Ft-shirt-black-regular-fit-p-3866891&docid=tOLaovXMqh8wkM&w=1200&h=1800&q=mens%20casual%20tsirt%20black&hl=tr&ved=2ahUKEwjCxeavrb3-AhV8gv0HHbJoA7QQMygAegUIARCvAQ",
    },
    {
      name: "ASUS GeForce RTX 3080 Ti",
      description: "Powerful graphics card for gaming and creative work.",
      price: 1499.99,
      spec: 12,
      article: "oem",
      image: "https://www.hepsiburada.com/asus-geforce-rtx-3080ti-oc-12gb-384bit-gddr6x-pci-express-4-0-ekran-karti-tuf-rtx3080ti-o12g-gaming-pm-HBC000009G4HH",
    },
    {
      name: "BenQ 27 inch 4K Monitor",
      description: "High-quality monitor with stunning color accuracy.",
      price: 599.99,
      spec: 27,
      article: "monitor",
      image: "https://www.hepsiburada.com/benq-pd2700u-27-60hz-1ms-hdmi-display-4k-ips-monitor-pm-HB000012VL33",
    },
    {
      name: "Assorted Snack Box",
      description: "A variety of delicious snacks to satisfy your cravings.",
      price: 19.99,
      article: "snack",
      image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F616wiqqRwgL._AC_.jpg&tbnid=w_JNIJFwjMmSaM&vet=12ahUKEwjZ8O66rr3-AhUahaQKHTy0BjkQMygAegUIARCxAQ..i&imgrefurl=https%3A%2F%2Fwww.amazon.com%2FSnack-Bar-Assortment-American-Students%2Fdp%2FB07V2BMSRF&docid=pEhgs9jr8XLsYM&w=500&h=496&q=Assorted%20Snack%20Box&hl=tr&ved=2ahUKEwjZ8O66rr3-AhUahaQKHTy0BjkQMygAegUIARCxAQ",
    },
    {
    name: "Women's Running Shoes",
    description: "Lightweight and comfortable shoes for running and exercise.",
    price: 79.99,
    size: "US 8",
    color: "Gray/Pink",
    article: "clothing",
    image: "https://www.amazon.in/Sparx-Womens-Sports-Running-Shoes/dp/B0788NN4B3",
  },
  {
    name: "Corsair Vengeance LPX 32GB DDR4 RAM",
    description: "High-performance RAM for gaming and intensive applications.",
    price: 219.99,
    spec: 32,
    article: "oem",
    image: "https://www.amazon.com.tr/Corsair-Cmk32Gx4M2E3200C16-Bellek-2X16GB-Siyah/dp/B07RW6Z692",
  },
  {
    name: "LG 34 inch Ultrawide Monitor",
    description: "Large and immersive monitor with a curved design.",
    price: 799.99,
    spec: 34,
    article: "monitor",
    image: "https://www.hepsiburada.com/lg-34wp65c-b-ultrawide-34-curved-1ms-160hz-freesync-premium-qhd-hdmix2-dpx1-va-led-monitor-p-HBCV000027RFTM",
  },
  {
    name: "Japanese Snack Box",
    description: "A curated selection of delicious Japanese snacks.",
    price: 24.99,
    article: "snack",
    image: "https://www.eatwithhop.com/2022/09/asian-snack-boxes-guide.html",
  },
  {
    name: "Men's Dress Shirt",
    description: "Classic, versatile dress shirt in a timeless style.",
    price: 49.99,
    size: "M",
    color: "White",
    article: "clothing",
    image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F1025%2F3059%2Fproducts%2FCLASSIC_WHITE_SHIRT_009_6ebe4c7c-df30-42d9-a330-b8b15acd8d80_2000x2000_crop_center.jpg%3Fv%3D1658432758&tbnid=WmRJA5Sa7wVp-M&vet=12ahUKEwil6e75sL3-AhX8iv0HHcLJA5cQMygEegUIARC-AQ..i&imgrefurl=https%3A%2F%2Fsuitshop.com%2Fproducts%2Fclassic-white-shirt%2F&docid=e270oLh156fRHM&w=2000&h=2000&q=Men%27s%20Dress%20Shirt%20white%20&hl=tr&ved=2ahUKEwil6e75sL3-AhX8iv0HHcLJA5cQMygEegUIARC-AQ",
  },
  {
    name: "AMD Ryzen 9 5900X Processor 12 cores",
    description: "High-performance processor for gaming and intensive applications.",
    price: 649.99,
    spec: 12,
    article: "oem",
    image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.vatanbilgisayar.com%2FUpload%2FPRODUCT%2Famd%2Fthumb%2F110038_large.jpg&tbnid=YhRTAOGu9g4ntM&vet=12ahUKEwje7tqrsb3-AhXOgv0HHdPnDAoQMygAegUIARDBAQ..i&imgrefurl=https%3A%2F%2Fwww.vatanbilgisayar.com%2Famd-ryzen-9-5900x-soket-am4-3-7ghz-64mb-105w-7nm-islemci.html&docid=n_1uxW14VqfL5M&w=1000&h=1000&q=AMD%20Ryzen%209%205900X%20Processor&hl=tr&ved=2ahUKEwje7tqrsb3-AhXOgv0HHdPnDAoQMygAegUIARDBAQ",
  },
  {
    name: "Dell 27 inch Gaming Monitor",
    description: "Fast and responsive gaming monitor with a sleek design.",
    price: 399.99,
    spec: 27,
    article: "monitor",
    image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F71JZS0cHVYL._AC_UF1000%2C1000_QL80_.jpg&tbnid=g5pR6k4bW7vG0M&vet=12ahUKEwiZmtrHsb3-AhXDPOwKHSZAB8wQMygGegUIARDNAQ..i&imgrefurl=https%3A%2F%2Fwww.amazon.com.tr%2FDell-S2721DGFA-2560x1440-DisplayPort-Ayarlanabilir%2Fdp%2FB08NFBKNMY&docid=Pn3w7RPd3HYAOM&w=968&h=1000&q=Dell%2027%20inch%20Gaming%20Monitor&ved=2ahUKEwiZmtrHsb3-AhXDPOwKHSZAB8wQMygGegUIARDNAQ",
  },
  {
    name: "Organic Fruit and Nut Trail Mix",
    description: "A healthy and delicious mix of dried fruit and nuts.",
    price: 7.99,
    article: "snack",
    image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fshopsunridgefarms.com%2Fwp-content%2Fuploads%2F2020%2F11%2F867657-1.jpg&tbnid=qYvOzvY9PHKsCM&vet=12ahUKEwiRmfvFsb3-AhXJ4KQKHSB-DQYQMygDegUIARDBAQ..i&imgrefurl=https%3A%2F%2Fshopsunridgefarms.com%2Fproduct%2Forganic-supreme-fruit-and-nut-mix%2F&docid=qS-09o3X6rF7vM&w=1000&h=1000&q=Organic%20Fruit%20and%20Nut%20Trail%20Mix&hl=tr&ved=2ahUKEwiRmfvFsb3-AhXJ4KQKHSB-DQYQMygDegUIARDBAQ",
  },
  {
    name: "Women's Leather Jacket",
    description: "Stylish and durable leather jacket for women.",
    price: 149.99,
    size: "L",
    color: "Black",
    article: "clothing",
    image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.asos-media.com%2Fproducts%2Fmiss-selfridge-faux-leather-biker-jacket-in-black%2F201922551-1-black%3F%24n_480w%24%26wid%3D476%26fit%3Dconstrain&tbnid=hevZgULZzC_TnM&vet=12ahUKEwjXnL_wsb3-AhWFP-wKHXnRA6oQMygMegUIARDVAQ..i&imgrefurl=https%3A%2F%2Fwww.amtec.edu%2Fleather-look-jacket-womens-k.html&docid=_EQ-KZ6Ze4UmcM&w=476&h=608&q=Women%27s%20Leather%20Jacket%20black%20%20&hl=tr&ved=2ahUKEwjXnL_wsb3-AhWFP-wKHXnRA6oQMygMegUIARDVAQ",
  },
  {
    name: "Nvidia GeForce RTX 3080 Ti",
    description: "Powerful graphics card for gaming and high-performance computing.",
    price: 1299.99,
    spec: 12,
    article: "oem",
    image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.akakce.com%2Fz%2Fgigabyte%2Fgigabyte-rtx-3080-ti-gaming-oc-12g-gv-n308tgaming-oc-12gd-384-bit-gddr5x-12-gb.jpg&tbnid=_GsiEjHJWd23bM&vet=12ahUKEwj6w7uxsr3-AhVP4aQKHRWHBMcQMygAegUIARC4AQ..i&imgrefurl=https%3A%2F%2Fwww.akakce.com%2Fekran-karti%2Fen-ucuz-gigabyte-rtx-3080-ti-gaming-oc-12g-gv-n308tgaming-oc-12gd-384-bit-gddr5x-12-gb-fiyati%2C1233718011.html&docid=6w6CqBUgXewgaM&w=500&h=453&q=Nvidia%20GeForce%20RTX%203080%20Ti&hl=tr&ved=2ahUKEwj6w7uxsr3-AhVP4aQKHRWHBMcQMygAegUIARC4AQ",
  },
  {
    name: "Samsung 32 inch Curved Monitor",
    description: "Immersive curved monitor for gaming and entertainment.",
    price: 349.99,
    spec: 32,
    article: "monitor",
    image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.samsung.com%2Fis%2Fimage%2Fsamsung%2Ftr-uhd-ur59c-lu32r590cwmxuf-frontblack-162992584%3F%24650_519_PNG%24&tbnid=kXyvORKwYbVMQM&vet=12ahUKEwjbxu3Jsr3-AhUjuaQKHa7qBAAQMygAegUIARDCAQ..i&imgrefurl=https%3A%2F%2Fwww.samsung.com%2Ftr%2Fmonitors%2Fhigh-resolution%2Fuhd-curved-monitor-with-1-billion-colors-32-inch-lu32r590cwmxuf%2F&docid=T2pa1NVhGpnbRM&w=650&h=519&q=Samsung%2032%20inch%20Curved%20Monitor&ved=2ahUKEwjbxu3Jsr3-AhUjuaQKHa7qBAAQMygAegUIARDCAQ",
  },
{
    name: "Men's Wool Overcoat",
    description: "Classic wool overcoat for men, perfect for formal occasions.",
    price: 199.99,
    size: "M",
    color: "Charcoal",
    article: "clothing",
    image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fnon-european.co.za%2Fwp-content%2Fuploads%2F2020%2F09%2Fsku-115658CME-side.jpg&tbnid=A5hpL6b6-7s29M&vet=12ahUKEwjIm9yRs73-AhVPyKQKHcvrDmsQMygjegUIARCcAg..i&imgrefurl=https%3A%2F%2Fnon-european.co.za%2Fshop%2Fmale-blazer-coat-charcoal-melange%2F&docid=rxEdzq0W4qL8aM&w=923&h=1200&q=Men%27s%20Wool%20Overcoat%20charcoal%20&hl=tr&ved=2ahUKEwjIm9yRs73-AhVPyKQKHcvrDmsQMygjegUIARCcAg",
  },
  {
    name: "LG 27 inch 4K HDR Monitor",
    description: "Stunning 4K HDR monitor with excellent color accuracy and brightness.",
    price: 599.99,
    spec: 27,
    article: "monitor",
    image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fproductimages.hepsiburada.net%2Fs%2F88%2F1500%2F110000031387879.jpg&tbnid=EkCDQP6iJWtLyM&vet=12ahUKEwj20uyXtL3-AhWMNOwKHYMCCpsQMygBegUIARC-AQ..i&imgrefurl=https%3A%2F%2Fwww.hepsiburada.com%2Flg-27ul650-w-27-4k-uhd-vesa-display-hdr400-beyaz-ips-led-monitor-pm-HBC00000B8KU4&docid=6rCjOY6ROIv-kM&w=1500&h=1500&q=LG%2027%20inch%204K%20HDR%20Monitor&ved=2ahUKEwj20uyXtL3-AhWMNOwKHYMCCpsQMygBegUIARC-AQ",
  },
  {
    name: "Dark Chocolate Covered Almonds",
    description: "Crunchy almonds coated in rich dark chocolate for a delicious and healthy snack.",
    price: 12.99,
    article: "snack",
    image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Ftarget.scene7.com%2Fis%2Fimage%2FTarget%2FGUEST_96ec9be3-d7bd-43ed-a072-3e06317c9629%3Fwid%3D488%26hei%3D488%26fmt%3Dpjpeg&tbnid=Fp_cl14zN_GiyM&vet=12ahUKEwiWmsfxtL3-AhVag6QKHTYCB1oQMygBegUIARDSAQ..i&imgrefurl=https%3A%2F%2Fwww.target.com%2Fp%2Fdark-chocolate-almonds-13oz-good-38-gather-8482%2F-%2FA-78099914&docid=S-YoX_8grrAzKM&w=488&h=488&q=Dark%20Chocolate%20Covered%20Almonds&hl=tr&ved=2ahUKEwiWmsfxtL3-AhVag6QKHTYCB1oQMygBegUIARDSAQ",
  },
  {
    name: "Logitech MX Master 3 Mouse 4000 DPI",
    description: "Advanced wireless mouse with a high-precision sensor and customizable buttons.",
    price: 99.99,
    spec: 4000,
    article: "oem",
    image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F61dSEvyl7dS.jpg&tbnid=rvytdF8Dms7HRM&vet=12ahUKEwiGi6H9tL3-AhVJ86QKHU2dAXkQMygCegUIARDAAQ..i&imgrefurl=https%3A%2F%2Fwww.amazon.com.tr%2FLogitech-MX-Kablosuz-Bluetooth-cephelerinde-kayd%25C4%25B1rma%2Fdp%2FB07W6JJSV1&docid=uhMnSb6yO-QZDM&w=1500&h=1500&q=Logitech%20MX%20Master%203%20Mouse&ved=2ahUKEwiGi6H9tL3-AhVJ86QKHU2dAXkQMygCegUIARDAAQ",
  },
  {
    name: "Healthy Snack Box",
    description: "Assortment of healthy and delicious snacks for guilt-free snacking.",
    price: 24.99,
    article: "snack",
    image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi0.wp.com%2Fwww.abeautifulrawr.com%2Fwp-content%2Fuploads%2F2019%2F02%2Fhealthy-snack-box-ideas.jpg%3Ffit%3D6000%252C4000%26ssl%3D1&tbnid=LI1SxPWSZJruQM&vet=12ahUKEwjY062itL3-AhUSz6QKHUsPA9QQMygFegUIARDLAQ..i&imgrefurl=https%3A%2F%2Fwww.abeautifulrawr.com%2F2019%2F02%2F27%2Fhealthy-snack-boxes-ideas-for-kids%2F&docid=VxLGGn7_wPcuAM&w=6000&h=4000&q=Healthy%20Snack%20Box&hl=tr&ved=2ahUKEwjY062itL3-AhUSz6QKHUsPA9QQMygFegUIARDLAQ",
    },
    {
    name: "Mixed Nuts",
    description: "A delicious and healthy snack mix of almonds, cashews, and walnuts.",
    price: 9.99,
    article: "snack",
    image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi5.walmartimages.com%2Fasr%2Fcf189ed8-2b57-4d50-8f3e-837ade050671.02622a02a9424c833ab1fe8e8cbe4058.jpeg&tbnid=gLHcuuzxu3QKjM&vet=12ahUKEwjA9Lf4tb3-AhXWhP0HHf7PCmwQMygJegUIARDiAQ..i&imgrefurl=https%3A%2F%2Fwww.walmart.com%2Fip%2FPlanters-Lightly-Salted-Mixed-Nuts-Less-Than-50-Peanuts-with-Peanuts-Almonds-Cashews-Hazelnuts-Pecans-15-oz-Canister%2F19514871&docid=8ruY81cLBrY69M&w=2400&h=2400&q=mixed%20nuts%20&ved=2ahUKEwjA9Lf4tb3-AhXWhP0HHf7PCmwQMygJegUIARDiAQ",
  },
  {
    name: "Assorted Japanese Snack Box",
    description: "A variety of delicious and unique Japanese snacks in one box.",
    price: 29.99,
    article: "snack",
    image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F81gX1ydxuSL._AC_UF894%2C1000_QL80_.jpg&tbnid=3zj_AiCKDsUPdM&vet=12ahUKEwi-18ztsr3-AhUM2aQKHeq_AnEQMygAegUIARCqAQ..i&imgrefurl=https%3A%2F%2Fwww.amazon.com%2FJapanese-Candy-Assortment-Snacks-50count%2Fdp%2FB084RK9HB7&docid=D2LqzUDP3iJ6QM&w=894&h=889&q=Assorted%20Japanese%20Snack%20Box%20salty&hl=tr&ved=2ahUKEwi-18ztsr3-AhUM2aQKHeq_AnEQMygAegUIARCqAQ",
  }
]

Item.insertMany(itemList)
.then(res => {
  console.log(res);
})
.catch(e => {
  console.log(e);
});

// const i = new Item(
//   {
//     name: "Nvidia GeForce RTX 3080 Ti",
//     description: "Powerful graphics card for gaming and high-performance computing.",
//     price: 1299.99,
//     spec: 12,
//     article: "oem",
//     image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.akakce.com%2Fz%2Fgigabyte%2Fgigabyte-rtx-3080-ti-gaming-oc-12g-gv-n308tgaming-oc-12gd-384-bit-gddr5x-12-gb.jpg&tbnid=_GsiEjHJWd23bM&vet=12ahUKEwj6w7uxsr3-AhVP4aQKHRWHBMcQMygAegUIARC4AQ..i&imgrefurl=https%3A%2F%2Fwww.akakce.com%2Fekran-karti%2Fen-ucuz-gigabyte-rtx-3080-ti-gaming-oc-12g-gv-n308tgaming-oc-12gd-384-bit-gddr5x-12-gb-fiyati%2C1233718011.html&docid=6w6CqBUgXewgaM&w=500&h=453&q=Nvidia%20GeForce%20RTX%203080%20Ti&hl=tr&ved=2ahUKEwj6w7uxsr3-AhVP4aQKHRWHBMcQMygAegUIARC4AQ",
//   }
// );
// i.save()
// .then(p => {console.log(p)})
// .catch(e => {console.log(e)});