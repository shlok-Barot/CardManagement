# Card Management System

## Hosted URL - https://67d5238a653aefa4fe02b95f--frontendtestnextjs.netlify.app/

## Overview
The **Card Management System** allows users to manage their credit and debit cards. Users can add, view, lock, archive, and set default cards, as well as integrate them with Google Pay.

## Features
### 1. Add Card
- Opens a dialog box with a form to add a new card.
- **Form Fields & Validations:**
  - **Name:** Required, max 35 characters.
  - **Bank Name:** Required.
  - **Card Type:** Dropdown (Credit, Debit) - Required.
  - **Card Number:** Required, must be a valid card number.
  - **Valid Till:** Required, must be a future date (MM/YYYY).
  - **CVV:** Required, input type - password.
  - **Set Card as Default:** Optional, system validation ensures only one default card per type.
  - **Add this card to GPay:** Optional.
- **On Submission:** Saves the card in storage and loads it into the slider (carousel) based on the selected card type.

### 2. Show Card Number
- By default, only the last four digits of a card number are visible.
- Clicking ‘Show Card Number’ reveals the full card number for the active card only.
- For other cards, the full number remains hidden.

### 3. Lock Card
- Clicking ‘Lock Card’ toggles the lock/unlock status of the active card.
- The locked card appears in a disabled color.
- The next card resets to its initial state.

### 4. Archive Card
- Clicking ‘Archive Card’ toggles the archive status of the active card.
- The archived card appears in a disabled color.
- The next card resets to its initial state.

### 5. Set as Default
- Sets a card as the default for its type.
- Only one default card is allowed per type.
- If a default card exists, the user must remove it before setting another card as default.

### 6. Add to GPay
- Flags the active card as enabled for Google Pay payments.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/card-management-system.git
   ```
2. Navigate to the project directory:
   ```sh
   cd CardManagement
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run the application:
   ```sh
   npm start
   ```

## Usage
- Navigate to the Card Management Page.
- Add a new card using the ‘Add Card’ button.
- Use the available actions to manage cards (Show Number, Lock, Archive, Set Default, Add to GPay).
- Cards are displayed in a slider (carousel) for easy navigation.

## License
This project is licensed under the [MIT License](LICENSE).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Contact
For any inquiries or issues, please reach out to [shlokbarot003@gmail.com].

