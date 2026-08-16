module.exports=[35914,e=>{e.v(e=>Promise.resolve().then(()=>e(62294)))},28746,e=>{"use strict";var t=e.i(62294);function r(e){return{...e,inStock:1===e.inStock,featured:1===e.featured}}function n(e){let n=(0,t.getDb)().prepare("SELECT * FROM products WHERE id = ?").get(e);return n?r(n):void 0}e.s(["createProduct",0,function(e){let r=(0,t.getDb)(),a=new Date().toISOString(),i=`${Date.now()}`;return r.prepare(`
    INSERT INTO products (id, name, price, category, description, imageUrl, inStock, featured, createdAt, updatedAt)
    VALUES (@id, @name, @price, @category, @description, @imageUrl, @inStock, @featured, @createdAt, @updatedAt)
  `).run({id:i,...e,inStock:+!!e.inStock,featured:+!!e.featured,createdAt:a,updatedAt:a}),n(i)},"deleteProduct",0,function(e){return(0,t.getDb)().prepare("DELETE FROM products WHERE id = ?").run(e).changes>0},"getProduct",0,n,"getProducts",0,function(){return(0,t.getDb)().prepare("SELECT * FROM products ORDER BY createdAt DESC").all().map(r)},"saveLead",0,function(e){let r=(0,t.getDb)(),n=`${Date.now()}`;r.prepare(`
    INSERT INTO leads (id, name, email, phone, message, productInterest, createdAt)
    VALUES (@id, @name, @email, @phone, @message, @productInterest, @createdAt)
  `).run({id:n,...e,createdAt:new Date().toISOString()})},"updateProduct",0,function(e,r){if(!n(e))return null;let a=new Date().toISOString();return(0,t.getDb)().prepare(`
    UPDATE products SET
      name = COALESCE(@name, name),
      price = COALESCE(@price, price),
      category = COALESCE(@category, category),
      description = COALESCE(@description, description),
      imageUrl = COALESCE(@imageUrl, imageUrl),
      inStock = COALESCE(@inStock, inStock),
      featured = COALESCE(@featured, featured),
      updatedAt = @updatedAt
    WHERE id = @id
  `).run({id:e,updatedAt:a,name:r.name??null,price:r.price??null,category:r.category??null,description:r.description??null,imageUrl:r.imageUrl??null,inStock:void 0!==r.inStock?+!!r.inStock:null,featured:void 0!==r.featured?+!!r.featured:null}),n(e)}])}];

//# sourceMappingURL=lib_06up4xi._.js.map