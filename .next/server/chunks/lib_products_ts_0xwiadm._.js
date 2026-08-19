module.exports=[9791,e=>{"use strict";var t=e.i(28746);e.s(["getProduct",()=>t.getProduct])},28746,e=>{"use strict";var t=e.i(62294);function r(e){return{...e,inStock:1===e.inStock,featured:1===e.featured}}let i=["Home Appliances","Tablets","Tablets & Watches","Wearables"];function a(e){let i=(0,t.getDb)().prepare("SELECT * FROM products WHERE id = ?").get(e);return i?r(i):void 0}e.s(["SALE_CATEGORY_LIST",0,i,"createProduct",0,function(e){let r=(0,t.getDb)(),i=new Date().toISOString(),n=`${Date.now()}`;return r.prepare(`
    INSERT INTO products (id, name, price, originalPrice, category, description, imageUrl, inStock, featured, createdAt, updatedAt)
    VALUES (@id, @name, @price, @originalPrice, @category, @description, @imageUrl, @inStock, @featured, @createdAt, @updatedAt)
  `).run({id:n,...e,originalPrice:e.originalPrice??"",inStock:+!!e.inStock,featured:+!!e.featured,createdAt:i,updatedAt:i}),a(n)},"deleteProduct",0,function(e){return(0,t.getDb)().prepare("DELETE FROM products WHERE id = ?").run(e).changes>0},"getCartEvents",0,function(){return(0,t.getDb)().prepare(`
    SELECT c.*, v.name AS visitorName, v.phone AS visitorPhone, v.email AS visitorEmail
    FROM cart_events c
    LEFT JOIN visitors v ON c.visitorId = v.id
    ORDER BY c.createdAt DESC
    LIMIT 200
  `).all()},"getLeads",0,function(){return(0,t.getDb)().prepare("SELECT * FROM leads ORDER BY createdAt DESC").all()},"getProduct",0,a,"getProducts",0,function(){return(0,t.getDb)().prepare("SELECT * FROM products ORDER BY createdAt DESC").all().map(r)},"getRelated",0,function(e,i,a=4){return(0,t.getDb)().prepare("SELECT * FROM products WHERE category = ? AND id != ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(i,e,a).map(r)},"getSaleProducts",0,function(){let e=i.map(()=>"?").join(", ");return(0,t.getDb)().prepare(`SELECT * FROM products WHERE inStock = 1 AND category IN (${e}) ORDER BY createdAt DESC`).all(...i).map(r)},"saveLead",0,function(e){let r=(0,t.getDb)(),i=`${Date.now()}`;r.prepare(`
    INSERT INTO leads (id, name, email, phone, message, productInterest, createdAt)
    VALUES (@id, @name, @email, @phone, @message, @productInterest, @createdAt)
  `).run({id:i,...e,createdAt:new Date().toISOString()})},"updateProduct",0,function(e,r){if(!a(e))return null;let i=new Date().toISOString();return(0,t.getDb)().prepare(`
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
  `).run({id:e,updatedAt:i,name:r.name??null,price:r.price??null,originalPrice:r.originalPrice??null,category:r.category??null,description:r.description??null,imageUrl:r.imageUrl??null,inStock:void 0!==r.inStock?+!!r.inStock:null,featured:void 0!==r.featured?+!!r.featured:null}),a(e)}])}];

//# sourceMappingURL=lib_products_ts_0xwiadm._.js.map