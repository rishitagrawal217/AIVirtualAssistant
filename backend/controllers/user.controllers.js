 import uploadOnCloudinary from "../config/cloudinary.js"
import openaiResponse from "../openai.js"
import User from "../models/user.model.js"
import moment from "moment"
return res.status(400).json({message:"user not found"})
        }

   return res.status(200).json(user)     
    } catch (error) {
       return res.status(400).json({message:"get current user error"}) 
    }
}

export const updateAssistant=async (req,res)=>{
   try {
      const {assistantName,imageUrl}=req.body
      let assistantImage;
if(req.file){
   assistantImage=await uploadOnCloudinary(req.file.path)
}else{
   assistantImage=imageUrl
}

const user=await User.findByIdAndUpdate(req.userId,{
   assistantName,assistantImage
},{new:true}).select("-password")
return res.status(200).json(user)

      

  } catch (error) {
    return res.status(400).json({ message: "updateAssistantError user error" })
  }
}


export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body
    console.log("Received command:", command);

    const user = await User.findById(req.userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ response: "User not found" });
    }

    user.history.push(command)
    await user.save()
    const userName = user.name
    const assistantName = user.assistantName
    console.log("Assistant name:", assistantName);

    const result = await openaiResponse(command, assistantName, userName)
    console.log("OpenAI raw response:", result);

    // Handle API errors
    if (!result) {
      console.log("OpenAI API error occurred");
      return res.status(500).json({
        response: "AI service error. Please try again later.",
        type: "error"
      });
    }

    const jsonMatch = result.match(/{[\s\S]*}/)
    if (!jsonMatch) {
      console.log("No JSON found in response");
      return res.status(400).json({ response: "sorry, i can't understand" })
    }
    const gemResult = JSON.parse(jsonMatch[0])
    console.log("Parsed Gemini result:", gemResult)
    const type = gemResult.type

    switch (type) {
      case 'get-date':
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `current date is ${moment().format("YYYY-MM-DD")}`
        });
      case 'get-time':
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `current time is ${moment().format("hh:mm A")}`
        });
      case 'get-day':
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `today is ${moment().format("dddd")}`
        });
      case 'get-month':
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `today is ${moment().format("MMMM")}`
        });
      case 'google-search':
      case 'youtube-search':
      case 'youtube-play':
      case 'general':
      case "calculator-open":
      case "instagram-open":
      case "facebook-open":
      case "weather-show":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: gemResult.response,
        });
      default:
        return res.status(400).json({ response: "I didn't understand that command." })
    }

  } catch (error) {
    console.log("Error in askToAssistant:", error);
    return res.status(500).json({ response: "ask assistant error" })
  }
}