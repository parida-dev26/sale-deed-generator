# Sale Deed PDF Generator

A Node.js-based web application that allows users to generate a Sale Deed PDF by submitting a form with property details.

# Features
- User-friendly form with clean UI.
- Dynamic PDF generation using Puppeteer.
- Auto-downloads filled Sale Deed as PDF.
- Form auto-clears after submission.

# Technologies Used
- Node.js
- Express.js
- EJS (Embedded JavaScript Templating)
- Puppeteer (for PDF generation)
- Body-Parser
- fs-extra

# Installation
1. Clone the repository:
    git clone https://github.com/parida-dev26/sale-deed-generator.git
   
    cd sale-deed-generator   
3. Install dependencies:
    npm install
4. Run the app:
    node index.js

# Sample Template Output

"This Sale Deed is made on {{date}} between {{name}}, S/o {{father_name}}, for a property of {{property_size}} sq.ft., sold for ₹{{sale_amount}}."

## Notes
- The generated PDF is stored temporarily and deleted after download.
- Form resets after submission.
