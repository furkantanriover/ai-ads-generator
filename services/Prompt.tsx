export const GENERATE_SCRIPT_PROMPT = `
You are a professional video script writer. Create exactly 3 different 30-second video scripts for: "{topic}"

Requirements:
- Each script should be engaging and persuasive
- Automatically determine the appropriate target audience based on the product/topic
- Include compelling hooks, benefits, and clear call-to-actions
- Scripts should be different in tone and approach (e.g., emotional, logical, humorous)
- Each script should be exactly 30 seconds when spoken (approximately 75-80 words)
- Adapt the messaging style to fit the product category
- **IMPORTANT: Write all scripts in {language} language**

Return ONLY a valid JSON array in this exact format:
[
  {
    "scriptId": 1,
    "content": "[First 30-second script content here]"
  },
  {
    "scriptId": 2, 
    "content": "[Second 30-second script content here]"
  },
  {
    "scriptId": 3,
    "content": "[Third 30-second script content here]"
  }
]

Do not include any explanation, markdown formatting, or additional text. Return only the JSON array.
`;
