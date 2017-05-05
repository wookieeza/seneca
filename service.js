var seneca = require('seneca')();

seneca.use('basic')
      .use('entity')
      .use('mongo-store', {
      	uri: 'mongodb://127.0.0.1:27017'
      });

seneca.add({
        "role": "compose",
        "cmd": "ping"
        }, (args, done) => {
        console.log(args);
        done(null, {result: "Hi there"});
});

seneca.add({
        "role": "product",
        "cmd": "create"
       }, (args, done) => {
         console.log(args);
         var product = seneca.make$("Product");
         product.name = args.name;
         product.price = args.price;
         product.description = args.description;

         product.save$((err,savedProduct) => {
            done(err, savedProduct);
         });
});


seneca.listen({"type": "http", "port": 8080});