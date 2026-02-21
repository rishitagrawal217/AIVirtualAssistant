// Simple rule-based AI responses (no API key required)
const ruleBasedResponse = (command, assistantName, userName) => {
  const lowerCommand = command.toLowerCase();
  
  // Remove assistant name from command
  const cleanCommand = lowerCommand.replace(assistantName.toLowerCase(), '').trim();
  
  // Time-based responses
  const now = new Date();
  const currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const currentDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  // Rule-based patterns
  if (cleanCommand.includes('time')) {
    return JSON.stringify({
      type: "get-time",
      userInput: cleanCommand,
      response: `The current time is ${currentTime}`
    });
  }
  
  if (cleanCommand.includes('date') || cleanCommand.includes('today')) {
    return JSON.stringify({
      type: "get-date", 
      userInput: cleanCommand,
      response: `Today is ${currentDate}`
    });
  }
  
  if (cleanCommand.includes('day')) {
    return JSON.stringify({
      type: "get-day",
      userInput: cleanCommand, 
      response: `Today is ${now.toLocaleDateString('en-US', { weekday: 'long' })}`
    });
  }
  
  if (cleanCommand.includes('month')) {
    return JSON.stringify({
      type: "get-month",
      userInput: cleanCommand,
      response: `This is ${now.toLocaleDateString('en-US', { month: 'long' })}`
    });
  }
  
  if (cleanCommand.includes('youtube')) {
    if (cleanCommand.includes('play') || cleanCommand.includes('open')) {
      return JSON.stringify({
        type: "youtube-play",
        userInput: cleanCommand.replace(/play|open|youtube/gi, '').trim() || "music",
        response: "Opening YouTube for you"
      });
    } else {
      return JSON.stringify({
        type: "youtube-search", 
        userInput: cleanCommand.replace(/youtube|search/gi, '').trim() || "videos",
        response: "Searching YouTube for you"
      });
    }
  }
  
  // Website opening commands
  if (cleanCommand.includes('open') && cleanCommand.includes('.com')) {
    const website = cleanCommand.match(/([a-zA-Z0-9-]+\.[a-zA-Z]{2,})/)?.[1];
    if (website) {
      return JSON.stringify({
        type: "website-open",
        userInput: website,
        response: `Opening ${website} for you`
      });
    }
  }
  
  if (cleanCommand.includes('open') && (cleanCommand.includes('website') || cleanCommand.includes('site'))) {
    const siteName = cleanCommand.replace(/open|website|site/gi, '').trim();
    return JSON.stringify({
      type: "google-search",
      userInput: siteName,
      response: `Searching for ${siteName} website`
    });
  }
  
  // Social media
  if (cleanCommand.includes('twitter') || cleanCommand.includes('x')) {
    return JSON.stringify({
      type: "website-open",
      userInput: "twitter.com",
      response: "Opening Twitter for you"
    });
  }
  
  if (cleanCommand.includes('linkedin')) {
    return JSON.stringify({
      type: "website-open", 
      userInput: "linkedin.com",
      response: "Opening LinkedIn for you"
    });
  }
  
  if (cleanCommand.includes('github')) {
    return JSON.stringify({
      type: "website-open",
      userInput: "github.com", 
      response: "Opening GitHub for you"
    });
  }
  
  if (cleanCommand.includes('reddit')) {
    return JSON.stringify({
      type: "website-open",
      userInput: "reddit.com",
      response: "Opening Reddit for you"
    });
  }
  
  // Shopping
  if (cleanCommand.includes('amazon')) {
    return JSON.stringify({
      type: "website-open",
      userInput: "amazon.com",
      response: "Opening Amazon for you"
    });
  }
  
  if (cleanCommand.includes('flipkart')) {
    return JSON.stringify({
      type: "website-open",
      userInput: "flipkart.com", 
      response: "Opening Flipkart for you"
    });
  }
  
  // Email
  if (cleanCommand.includes('gmail') || cleanCommand.includes('email')) {
    return JSON.stringify({
      type: "website-open",
      userInput: "gmail.com",
      response: "Opening Gmail for you"
    });
  }
  
  // News
  if (cleanCommand.includes('news')) {
    return JSON.stringify({
      type: "google-search",
      userInput: "latest news",
      response: "Getting latest news for you"
    });
  }
  
  if (cleanCommand.includes('google') || cleanCommand.includes('search')) {
    return JSON.stringify({
      type: "google-search",
      userInput: cleanCommand.replace(/google|search|for/gi, '').trim() || "information",
      response: "Searching Google for you"
    });
  }
  
  if (cleanCommand.includes('calculator')) {
    return JSON.stringify({
      type: "calculator-open",
      userInput: cleanCommand,
      response: "Opening calculator for you"
    });
  }
  
  if (cleanCommand.includes('instagram')) {
    return JSON.stringify({
      type: "instagram-open", 
      userInput: cleanCommand,
      response: "Opening Instagram for you"
    });
  }
  
  if (cleanCommand.includes('facebook')) {
    return JSON.stringify({
      type: "facebook-open",
      userInput: cleanCommand, 
      response: "Opening Facebook for you"
    });
  }
  
  if (cleanCommand.includes('weather')) {
    return JSON.stringify({
      type: "weather-show",
      userInput: cleanCommand,
      response: "Checking weather for you"
    });
  }
  
  // Personal questions
  if (cleanCommand.includes('who created you') || cleanCommand.includes('who made you')) {
    return JSON.stringify({
      type: "general",
      userInput: cleanCommand,
      response: `I was created by ${userName}`
    });
  }
  
  if (cleanCommand.includes('how are you') || cleanCommand.includes('how are you doing')) {
    return JSON.stringify({
      type: "general",
      userInput: cleanCommand,
      response: "I'm doing great, thanks for asking! How can I help you today?"
    });
  }
  
  if (cleanCommand.includes('hello') || cleanCommand.includes('hi') || cleanCommand.includes('hey')) {
    return JSON.stringify({
      type: "general",
      userInput: cleanCommand,
      response: `Hello ${userName}! How can I assist you today?`
    });
  }
  
  if (cleanCommand.includes('thank')) {
    return JSON.stringify({
      type: "general",
      userInput: cleanCommand,
      response: "You're welcome! Happy to help!"
    });
  }
  
  // Default response
  return JSON.stringify({
    type: "general",
    userInput: cleanCommand,
    response: "I'm not sure how to help with that, but I'm learning! Try asking about time, date, or to open YouTube."
  });
};

export default ruleBasedResponse;
