module.exports=[9791,e=>{"use strict";var r=e.i(28746);e.s(["getProduct",()=>r.getProduct])},28746,67357,e=>{"use strict";var r=e.i(62294);function t(e){return{...e,stock:Number(e.stock),price_override:null!=e.price_override?Number(e.price_override):null}}function i(e){return(0,r.getDb)().prepare("SELECT * FROM product_variants WHERE product_id = ? ORDER BY colour, size").all(e).map(t)}function a(e){return{...e,inStock:1===e.inStock,featured:1===e.featured,newArrival:1===e.newArrival,gender:e.gender??null,material:e.material??null,fit:e.fit??null,slug:e.slug??e.id}}function n(){return(0,r.getDb)().prepare("SELECT * FROM products ORDER BY createdAt DESC").all().map(a)}function l(e){let t=(0,r.getDb)().prepare("SELECT * FROM products WHERE id = ? OR slug = ?").get(e,e);return t?a(t):void 0}e.s(["getVariant",0,function(e){let i=(0,r.getDb)().prepare("SELECT * FROM product_variants WHERE id = ?").get(e);return i?t(i):null},"getVariantsByProduct",0,i],67357),e.s(["createProduct",0,function(e){var t;let i,a=(0,r.getDb)(),n=new Date().toISOString(),c=`${Date.now()}`,u=e.slug||(t=e.name,i=t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),`${i}-${c.slice(-6)}`);return a.prepare(`
    INSERT INTO products (id, name, slug, price, originalPrice, category, gender, description, imageUrl, material, fit, newArrival, inStock, featured, createdAt, updatedAt)
    VALUES (@id, @name, @slug, @price, @originalPrice, @category, @gender, @description, @imageUrl, @material, @fit, @newArrival, @inStock, @featured, @createdAt, @updatedAt)
  `).run({id:c,name:e.name,slug:u,price:e.price,originalPrice:e.originalPrice??"",category:e.category,gender:e.gender??null,description:e.description,imageUrl:e.imageUrl,material:e.material??null,fit:e.fit??null,newArrival:+!!e.newArrival,inStock:+!!e.inStock,featured:+!!e.featured,createdAt:n,updatedAt:n}),l(c)},"deleteProduct",0,function(e){return(0,r.getDb)().prepare("DELETE FROM products WHERE id = ?").run(e).changes>0},"getCartEvents",0,function(){return(0,r.getDb)().prepare(`
    SELECT c.*, v.name AS visitorName, v.phone AS visitorPhone, v.email AS visitorEmail
    FROM cart_events c
    LEFT JOIN visitors v ON c.visitorId = v.id
    ORDER BY c.createdAt DESC
    LIMIT 200
  `).all()},"getFeaturedProducts",0,function(e=8){return(0,r.getDb)().prepare("SELECT * FROM products WHERE featured = 1 AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(e).map(a)},"getLeads",0,function(){return(0,r.getDb)().prepare("SELECT * FROM leads ORDER BY createdAt DESC").all()},"getNewArrivals",0,function(e=8){return(0,r.getDb)().prepare("SELECT * FROM products WHERE newArrival = 1 AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(e).map(a)},"getProduct",0,l,"getProductWithVariants",0,function(e){let r=l(e);if(r)return{...r,variants:i(r.id)}},"getProducts",0,n,"getProductsByCategory",0,function(e,t=24){return(0,r.getDb)().prepare("SELECT * FROM products WHERE category = ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(e,t).map(a)},"getProductsByGender",0,function(e,t=24){return(0,r.getDb)().prepare("SELECT * FROM products WHERE gender = ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(e,t).map(a)},"getProductsWithVariants",0,function(){return n().map(e=>({...e,variants:i(e.id)}))},"getRelated",0,function(e,t,i=4){return(0,r.getDb)().prepare("SELECT * FROM products WHERE category = ? AND id != ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(t,e,i).map(a)},"getSaleProducts",0,function(e=24){return(0,r.getDb)().prepare("SELECT * FROM products WHERE inStock = 1 AND originalPrice IS NOT NULL AND originalPrice != '' ORDER BY createdAt DESC LIMIT ?").all(e).map(a)},"saveLead",0,function(e){let t=(0,r.getDb)(),i=`${Date.now()}`;t.prepare(`
    INSERT INTO leads (id, name, email, phone, message, productInterest, createdAt)
    VALUES (@id, @name, @email, @phone, @message, @productInterest, @createdAt)
  `).run({id:i,...e,createdAt:new Date().toISOString()})},"updateProduct",0,function(e,t){if(!l(e))return null;let i=new Date().toISOString();return(0,r.getDb)().prepare(`
    UPDATE products SET
      name         = COALESCE(@name, name),
      slug         = COALESCE(@slug, slug),
      price        = COALESCE(@price, price),
      originalPrice= COALESCE(@originalPrice, originalPrice),
      category     = COALESCE(@category, category),
      gender       = COALESCE(@gender, gender),
      description  = COALESCE(@description, description),
      imageUrl     = COALESCE(@imageUrl, imageUrl),
      material     = COALESCE(@material, material),
      fit          = COALESCE(@fit, fit),
      newArrival   = COALESCE(@newArrival, newArrival),
      inStock      = COALESCE(@inStock, inStock),
      featured     = COALESCE(@featured, featured),
      updatedAt    = @updatedAt
    WHERE id = @id
  `).run({id:e,updatedAt:i,name:t.name??null,slug:t.slug??null,price:t.price??null,originalPrice:t.originalPrice??null,category:t.category??null,gender:t.gender??null,description:t.description??null,imageUrl:t.imageUrl??null,material:t.material??null,fit:t.fit??null,newArrival:void 0!==t.newArrival?+!!t.newArrival:null,inStock:void 0!==t.inStock?+!!t.inStock:null,featured:void 0!==t.featured?+!!t.featured:null}),l(e)}],28746)}];

//# sourceMappingURL=lib_products_ts_0xwiadm._.js.map