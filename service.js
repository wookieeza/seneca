var seneca = require('seneca')();

seneca.use('basic')
      .use('entity')
      .use('redis-store', {
      	uri: 'redis://127.0.0.1:6379'
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
         var product = seneca.make$("Product");
         product.name = args.name;
         product.price = args.price;
         product.description = args.description;

         product.save$((err,savedProduct) => {
            done(err, savedProduct);
         });
});


seneca.listen({"type": "http", "port": 8080});