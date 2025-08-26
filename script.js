document.getElementById("runBtn").addEventListener("click", async () => {
  const code = document.getElementById("code").value;
  const language = document.getElementById("language").value;
  const outputBox = document.getElementById("output");

  if (code.trim() === "") {
    outputBox.textContent = "⚠️ Please write some code!";
    return;
  }

  // Map language selection to Judge0 API language IDs
  const languageMap = {
    cpp: 54,      // C++ (GCC 9.2.0)
    java: 62,     // Java (OpenJDK 13.0.1)
    python: 71,   // Python (3.8.1)
    javascript: 63 // JavaScript (Node.js 12.14.0)
  };

  outputBox.textContent = "⏳ Running your code...";

  try {
    // Send code to Judge0 API
    let response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "x-rapidapi-key": "YOUR_API_KEY_HERE" // replace with your RapidAPI key
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageMap[language],
        stdin: "" // You can also take input from user
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
