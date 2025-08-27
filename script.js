document.getElementById("runBtn").addEventListener("click", async () => {
  const code = document.getElementById("code").value;
  const language = document.getElementById("language").value;
  const outputBox = document.getElementById("output");

  if (code.trim() === "") {
    outputBox.textContent = "⚠️ Please write some code!";
    return;
  }

  
  const languageMap = {
    cpp: 54,      
    java: 62,     
    python: 71,  
    javascript: 63 
  };

  outputBox.textContent = "⏳ Running your code...";

  try {
    
    let response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_enco/ded=false&wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "x-rapidapi-key": "YOUR_API_KEY_HERE" 
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageMap[language],
        stdin: "" 
      })
    });

    let result = await response.json();

    if (result.stdout) {
      outputBox.textContent = result.stdout;
    } else if (result.stderr) {
      outputBox.textContent = "❌ Error:\n" + result.stderr;
    } else if (result.compile_output) {
      outputBox.textContent = "⚠️ Compilation Error:\n" + result.compile_output;
    } else {
      outputBox.textContent = "⚠️ Unknown Error!";
    }
  } catch (error) {
    outputBox.textContent = "🚨 Failed to run code. Check your API key or internet connection.";
  }
});
