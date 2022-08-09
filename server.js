const { json, urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const inventary_model = require("./models/inventary_model");
const customer_model = require("./models/customer_model");
const order_model = require('./models/order_model')
const app = express();


//middleware

app.use(json());
app.use(urlencoded({ extended: false }));
app.set("view engine", "ejs")


app.listen(3001, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("server contected to 3001")
    }
})

mongoose.connect("mongodb://localhost/api_web_tech_assignment", () => {
    console.log("connected to db")
}, (err) => {
    console.log(err)
})

setinventaryquantity = (num1, num2) => {
    return sum = num1 - num2

}

app.post("/inventary/add", (req, res) => {
    inventary_model.create({
        inventory_id: req.body.inventory_id, inventory_type: req.body.inventory_type,
        item_name: req.body.item_name, available_quantity: req.body.available_quantity
    }).then(() => {
        res.status(200).send("Added succesfully")
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.post("/customer/add", (req, res) => {

    customer_model.find({ email: req.body.email }).then((userdata) => {
        if (userdata.length) {
            res.status(401).send("Email already exist");
            console.log(userdata)
        }
        else {

            customer_model.create({
                customer_id: req.body.customer_id, customer_name: req.body.customer_name,
                email: req.body.email
            }).then(() => {
                res.status(200).send("Added succesfully")
            }).catch((err) => {
                res.status(400).send(err)
            })
        }

    }).catch((err) => {
        res.status(400).send(err)
    })


})

app.post("/order/add", (req, res) => {
    inventary_model.find({ inventory_id: req.body.inventory_id }).then((inventarydata) => {
        

        const setinventary = setinventaryquantity(inventarydata[0].available_quantity, req.body.quantity);
        if (setinventary >= 0) {

            

            order_model.find({ inventory_id: req.body.inventory_id }).then((orderdata) => {
                if (orderdata.length) {
                    order_model.updateOne({ quantity: req.body.quantity }).then(() => {
                        
                        // console.log(setinventary,orderdata)
                                                   
                        res.status(200).send("Order updated succesfully")
                    }).catch((err) => {
                        res.status(400).send(err)
                    })

                } else {
                    order_model.create({
                        customer_id: req.body.customer_id, inventory_id: req.body.inventory_id,
                        item_name: req.body.item_name, quantity: req.body.quantity
                    }).then(() => {
                        res.status(200).send("Added succesfully")
                    }).catch((err) => {
                        res.status(400).send(err)
                    })
                }

            }).catch((err) => {
                res.status(400).send(err)
            })


        } else {
            res.send("Out of stock")
        }



    }).then((err) => {
        console.log(err)
    })






})


app.get("/inventary", (req, res) => {
    inventary_model.find().then((data) => {
        res.render("inventary.ejs", { inventarydata: data })
    }).catch((err) => {
        res.send(err)
    })

})

app.get("/customer", (req, res) => {
    customer_model.find().then((data) => {

        res.render("customer.ejs", { customerdata: data })
    }).catch((err) => {
        res.send(err)
    })

})

app.get('/order', (req, res) => {
    order_model.find().then((data) => {
        console.log(data)

        res.render("order.ejs", { orderdata: data })
    }).catch((err) => {
        res.send(err)
    })
})


