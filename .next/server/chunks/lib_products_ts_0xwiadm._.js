module.exports=[9791,e=>{"use strict";var t=e.i(28746);e.s(["getProduct",()=>t.getProduct])},28746,e=>{"use strict";var t=e.i(62294);let r=["Clothing & Apparel","Men's Wear","Women's Fashion","Hoodies & Streetwear","Sneakers & Shoes","Caps & Accessories"];function a(e){return{...e,inStock:1===e.inStock,featured:1===e.featured}}[...r];let i=["Home Appliances","Tablets","Tablets & Watches","Wearables"];function n(e){let r=(0,t.getDb)().prepare("SELECT * FROM products WHERE id = ?").get(e);return r?a(r):void 0}e.s(["SALE_CATEGORY_LIST",0,i,"createProduct",0,function(e){let r=(0,t.getDb)(),a=new Date().toISOString(),i=`${Date.now()}`;return r.prepare(`
    INSERT INTO products (id, name, price, originalPrice, category, description, imageUrl, inStock, featured, createdAt, updatedAt)
    VALUES (@id, @name, @price, @originalPrice, @category, @description, @imageUrl, @inStock, @featured, @createdAt, @updatedAt)
  `).run({id:i,...e,originalPrice:e.originalPrice??"",inStock:+!!e.inStock,featured:+!!e.featured,createdAt:a,updatedAt:a}),n(i)},"deleteProduct",0,function(e){return(0,t.getDb)().prepare("DELETE FROM products WHERE id = ?").run(e).changes>0},"getCartEvents",0,function(){return(0,t.getDb)().prepare(`
    SELECT c.*, v.name AS visitorName, v.phone AS visitorPhone, v.email AS visitorEmail
    FROM cart_events c
    LEFT JOIN visitors v ON c.visitorId = v.id
    ORDER BY c.createdAt DESC
    LIMIT 200
  `).all()},"getClothingProducts",0,function(){let e=r.map(()=>"?").join(", ");return(0,t.getDb)().prepare(`SELECT * FROM products WHERE inStock = 1 AND category IN (${e}) ORDER BY createdAt DESC`).all(...r).map(a)},"getLeads",0,function(){return(0,t.getDb)().prepare("SELECT * FROM leads ORDER BY createdAt DESC").all()},"getProduct",0,n,"getProducts",0,function(){return(0,t.getDb)().prepare("SELECT * FROM products ORDER BY createdAt DESC").all().map(a)},"getRelated",0,function(e,r,i=4){return(0,t.getDb)().prepare("SELECT * FROM products WHERE category = ? AND id != ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(r,e,i).map(a)},"getSaleProducts",0,function(){let e=i.map(()=>"?").join(", ");return(0,t.getDb)().prepare(`SELECT * FROM products WHERE inStock = 1 AND category IN (${e}) ORDER BY createdAt DESC`).all(...i).map(a)},"saveLead",0,function(e){let r=(0,t.getDb)(),a=`${Date.now()}`;r.prepare(`
    INSERT INTO leads (id, name, email, phone, message, productInterest, createdAt)
    VALUES (@id, @name, @email, @phone, @message, @productInterest, @createdAt)
  `).run({id:a,...e,createdAt:new Date().toISOString()})},"updateProduct",0,function(e,r){if(!n(e))return null;let a=new Date().toISOString();return(0,t.getDb)().prepare(`
    UPDATE products SET
      name = COALESCE(@name, name),
      price = COALESCE(@price, price),
      originalPrice = COALESCE(@originalPrice, originalPrice),
      category = COALESCE(@category, category),
      description = COALESCE(@description, description),
      imageUrl = COALESCE(@imageUrl, imageUrl),
      inStock = COALESCE(@inStock, inStock),
      featured = COALESCE(@featured, featured),
      updatedAt = @updatedAt
    WHERE id = @id
  `).run({id:e,updatedAt:a,name:r.name??null,price:r.price??null,originalPrice:r.originalPrice??null,category:r.category??null,description:r.description??null,imageUrl:r.imageUrl??null,inStock:void 0!==r.inStock?+!!r.inStock:null,featured:void 0!==r.featured?+!!r.featured:null}),n(e)}],28746)}];

//# sourceMappingURL=lib_products_ts_0xwiadm._.js.map