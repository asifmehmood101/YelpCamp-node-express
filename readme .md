Restfull Routes
----------------------------------------------------------------------------------------------------------------------------
name       Routes        methods         desc                                                           Mongoose Mehtod
----------------------------------------------------------------------------------------------------------------------------   
INDEX      /DOgs          GET           Display the list of all dogs                                    dogs.find()
NEW        /Dogs/new      GET           Display Form to make a new dog                                      N/A
CREATE     /Dogs          POST          Add new Dog to DB                                               dogs.create()                                            
SHOW       /Dog/:id       GET           Display Each dog Detail                                         dogs.findbyid()
Edit      /Dogs/:id/edit  GET           Show edit form for one dog                                      dogs.findbyid()   
UPDATE     /Dogs/:id      PUT           Update a particuler dog ,then redirect somewhere                dogs.findbyidAndUpdate()
Destroy   /Dogs/:id       DELETE        Delete a particuler dog ,then redirect somewhere                dogs.findbyidAndDelete()