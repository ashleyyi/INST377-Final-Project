const supabaseClient =  require('@supabase/supabase-js')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 5500
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
const url = 'https://omyubdszrtwpuchetxkn.supabase.co'
const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9teXViZHN6cnR3cHVjaGV0eGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU1NTI5MTEsImV4cCI6MjAzMTEyODkxMX0.Da3dSw3AznoXN8I43YO5uEEkp804SVm8UoFc8sh6uHQ'
const supabase = supabaseClient.createClient(url,supabase_key)
app.get('/trackers', async(req,res)=>{
    console.log("getting")
    const { data, error } = await supabase
        .from('trackers')
        .select()
    console.log("data: " ,data)
    res.send(data)
   

})
app.post('/trackers',async (req,res)=>{
    console.log("adding client")
    console.log("body",req.body)   
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var goal_calories = req.body.goal_calories;
    var goal_fats = req.body.goal_fats;
    var goal_carbs = req.body.goal_carbs;
    var goal_protein =req.body.goal_protein
    console.log("carbs",req.body.goal_carbs)
 
    const { data, error } = await supabase

        .from('trackers')
        .insert([
            {'first_name': firstName, 'last_name': lastName, 'goal_calories': goal_calories,'goal_fats': goal_fats, 'goal_carbs': goal_carbs,'goal_protein': goal_protein},
         ])
    .select()
    if(error){
        res.send(error)
        console.log("error", error)
    }else{
        res.send(data)
    }

})
app.listen(port,()=>{

    console.log("successful")
})