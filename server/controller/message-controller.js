import Message from "../model/messages.js";

export const sendMessage = async(req,res) => {

    // console.log(req);
    const { name, email, subject, message, userId, role } = req.body;

    try{
         
        const newMessage = {
            name,
            email,
            subject,
            message,
            userId,
            role
        }

        const messageData = new Message(newMessage);
        await messageData.save();

         return res.status(200).json({msg:"Message sent successfully "});
    }catch(error){
        return res.status(500).json({msg:"Error sending message", error: error.message});
    }
}

