const express = require('express');
const dbmodel = require('./models/model');
const router = express.Router();

router.use(express.json());

// Route for user detail page
router.get('/', async (req, resp) => {
    try {
        const data = await dbmodel.find();
        resp.render("indexs", { data, deletemessage:null,deleteid:null});
    } catch (err) {
        console.log('Error during fetching operation:', err);
    }
});

// Route for registration page (new user)
router.get("/add", (req, resp) => {
    resp.render("add", { user: {}, message: null, dataInitial: null });
});



// Route to get user data for editing
router.get("/add/:_id", async (req, resp) => {
    try {
        const id = req.params._id;
        const user = await dbmodel.findById(id);
        const dataInitial = user;


        resp.render("add", { user, message: null, dataInitial });

    } catch (err) {
        console.log('Error while fetching user data:', err);
    }
});


router.post("/edit", async (req, resp) => {





    try {






        const _id = req.body._id;









        const user = {

            _id,
            Name: req.body.Name,
            Email: req.body.Email,
            Password: req.body.Password,
            Contact_No: req.body.Contact_No
        };


        const dataInitial = await dbmodel.findById(_id);

        if (user.Password.length !== 8) {

            ;

            return resp.render('add', {
                user,
                dataInitial,
                message: 'Invalid Password. Password should contain exactly 8 characters.'



            });
        }

        if (user.Contact_No.length !== 11) {
            return resp.render('add', {
                user,
                dataInitial,

                message: 'Invalid contact number. It should contain 11 digits.'
            });
        }

        if (!user.Contact_No.startsWith("03")) {
            return resp.render('add', {
                user,
                dataInitial,
                message: 'Invalid contact number. It should begin with "03".'
            });
        }


        const existingUser1 = await dbmodel.findOne({ Email: user.Email });

        if (existingUser1 && existingUser1._id.toString() !== _id) {
            console.log("existinguser1:", existingUser1._id);
            return resp.render('add', {
                user,
                dataInitial,
                message: 'Email already exists. Please use a different email.'
            });
        }

        const existingUser2 = await dbmodel.findOne({ Password: user.Password });
        if (existingUser2 && existingUser2._id.toString() !== _id) {
            return resp.render('add', {
                user,
                dataInitial,
                message: 'Password already exists. Please use a different password.'
            });
        }
        const existingUser3 = await dbmodel.findOne({ Contact_No: user.Contact_No });
        if (existingUser3 && existingUser3._id.toString() !== _id) {
            return resp.render('add', {
                user,
                dataInitial,
                message: 'Contact number already exists. Please use a different contact number.'
            });
        }


        await dbmodel.findByIdAndUpdate(_id, user);
        return resp.redirect('/users/?message=One record updated successfully');
    } catch (err) {

        console.log('error while processing data:', err)
    }

});





router.post("/create", async (req, resp) => {

    try {






        









        const user = {

            // _id,
            Name: req.body.Name,
            Email: req.body.Email,
            Password: req.body.Password,
            Contact_No: req.body.Contact_No
        };


        // const dataInitial = await dbmodel.findById(_id);

        if (user.Password.length !== 8) {

            

            return resp.render('add', {
                user,
                dataInitial:null,
                message: 'Invalid Password. Password should contain exactly 8 characters.'



            });
        }

        if (user.Contact_No.length !== 11) {
            return resp.render('add', {
                user,
                dataInitial:null,

                message: 'Invalid contact number. It should contain 11 digits.'
            });
        }

        if (!user.Contact_No.startsWith("03")) {
            return resp.render('add', {
                user,
                dataInitial:null,
                message: 'Invalid contact number. It should begin with "03".'
            });
        }


        const existingUser1 = await dbmodel.findOne({ Email: user.Email });

        if (existingUser1 ) {
            // console.log("existinguser1:", existingUser1._id);
            return resp.render('add', {
                user,
                dataInitial:null,
                message: 'Email already exists. Please use a different email.'
            });
        }

        const existingUser2 = await dbmodel.findOne({ Password: user.Password });
        if (existingUser2) {
            return resp.render('add', {
                user,
                dataInitial:null,
                message: 'Password already exists. Please use a different password.'
            });
        }
        const existingUser3 = await dbmodel.findOne({ Contact_No: user.Contact_No });
        if (existingUser3 ) {
            return resp.render('add', {
                user,
                dataInitial:null,
                message: 'Contact number already exists. Please use a different contact number.'
            });
        }

    


        await dbmodel.create( user);
        return resp.redirect('/users/?message=One record inserted successfully');
    } catch (err) {

        console.log('error while processing data:', err)
    }

});

















router.post("/delete/:_id", async (req, resp) => {
    deleteid = req.params._id;

    try{
        const data = await dbmodel.find();
    
        return resp.render("indexs",{deletemessage:"Are you sure you want to delete this record permanently ?",data,deleteid})

    }catch(err){
        console.log("error while deleting")    }
 
});


router.post("/deleteyes/:id",async(req,resp)=>{

  const id=req.params.id;
       try {
        await dbmodel.findByIdAndDelete(id);
        resp.redirect("/users/?message=One record deleted successfully");
        console.log('Deleted successfully');
    } catch (err) {
        console.log('Not deleted:', err);
    }

});

module.exports = router;
