import OpenAI from 'openai'

const openai = new OpenAI;

async function main(){
    req.params = [message]
    const completion = await openai.chat.completions.create({
        messages:[{
            role:"user", 
            content:message
        }],
        model:'gpt-3.5-turbo'
    })
    console.log(completion.choices[0])
}
main()
