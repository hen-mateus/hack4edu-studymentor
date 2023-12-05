const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const mensage ={};

mensage.botaAi = async (req, res) => {
  const {message} = req.body;
  console.log(message)
  try{
    const response= await openai.chat.completions.create(
      {
        messages: [{ role: "user", content: message }],
        model: "gpt-3.5-turbo", 
      }
    );
    const completion = response.choices[0].message.content;
    
    res.send(
      completion
      )
  }catch(error){
      console.error(error);
      res.status(500).send("An error occurred")
  } 
}



module.exports = mensage


