# BhaktiVani App - Wireframe & UI/UX Specifications

This document outlines the wireframes and user experience for the key screens of the BhaktiVani application. The design prioritizes a clean, intuitive interface, a superior reading experience, and robust accessibility.

---

## 1. Home Screen

**Objective:** Allow users to easily browse and select devotional texts, filtered by their chosen language.

**Layout:**
- **Header:**
  - `[App Logo/Title: BhaktiVani]` (left-aligned)
  - `[Language Selector (Dropdown)]` (right-aligned) - Shows the current language (e.g., "ಕನ್ನಡ"). Tapping it opens a modal to switch between Kannada, Sanskrit, and Telugu.
- **Body:**
  - A vertically scrolling list, grouped by categories (e.g., "Stotras", "Ashtottaras").
  - Each category is a bold heading.
  - Under each category heading is a list of texts available in the selected language.
  - **Text Item:** A tappable row containing:
    - `[Text Title]` (e.g., "ಗಣೇಶ ಪಂಚರತ್ನಂ") - Prominent, in the script of the selected language.
    - `[Favorite Icon (Star)]` (optional, appears if the item is favorited) - A small star icon next to the title.
- **Favorites Section (Pinned):**
  - A special section at the very top, labeled "Favorites".
  - This section is only visible if the user has favorited at least one item.
  - It displays favorited texts in a similar list format, for quick access.

**User Flow:**
1. User opens the app and lands on the Home Screen. The content is displayed in the default or last selected language.
2. User can scroll through the categorized list of texts.
3. Tapping a text item navigates to the **Reader Screen**.
4. **Long-pressing** a text item toggles its "Favorite" status. A favorited item is added to/removed from the Favorites section at the top.
5. Tapping the Language Selector opens a simple modal with the three language choices. Selecting a new language immediately re-renders the Home Screen with content for that language.

---

## 2. Reader Screen

**Objective:** Provide a distraction-free, customizable, Kindle-quality reading experience.

**Layout:**
- **Header (minimal, auto-hides on scroll):**
  - `[Back Button]` (left)
  - `[Text Title]` (center)
  - `[Aa (Display Settings) Button]` (right)
- **Body:**
  - The full devotional text, rendered beautifully in the selected language's script.
  - The text flows to fit the screen (portrait/landscape).
  - Ample padding/margins around the text area.
- **Footer (hidden, part of the header/footer UI that appears on tap):**
  - `[Scrubber/Progress Bar]` - Shows the user's position in the text. Draggable.

**"Aa" Display Settings Dialog (Opened by the 'Aa' button):**
This is a modal or bottom sheet that provides detailed control over the text appearance.
- **Font Size:** A slider or buttons (`-` / `+`) to decrease/increase font size.
- **Font Family:** A selection of 2-3 high-quality, hand-picked fonts for Indian scripts.
- **Theme/Color:** Buttons for `Light`, `Sepia`, and `Dark` modes.
- **Margins:** Buttons for `Narrow`, `Medium`, `Wide`.
- **Line Spacing:** A slider or buttons to control the space between lines of text.
- **Live Preview:** A small window within the dialog shows a sample of the text with the new settings applied instantly.
- `[Reset to Default Button]`

**User Flow:**
1. User navigates from the Home Screen to the Reader Screen.
2. The app loads the text and scrolls to the last-read position (if any).
3. The user can scroll through the text. A single tap on the screen toggles the visibility of the header/footer controls.
4. Tapping the "Aa" button opens the display settings dialog.
5. Changing any setting in the dialog instantly updates the text rendering in the main view behind the dialog.
6. The app saves the user's display preferences and the last-read position for each text automatically.

---

## 3. Search Screen

**Objective:** Allow users to quickly find texts by title.

**Layout:**
- **Header:**
  - `[Search Input Box]` - A prominent search bar at the top with a clear "Search" button or icon. It should have a placeholder like "Search for a stotra...".
- **Body:**
  - **Initial State:** Can display a list of recent searches or be empty.
  - **On-Typing State:** As the user types, a list of matching text titles appears in real-time.
  - **Search Results:** A simple list of tappable rows, each showing a `[Text Title]`. The search is performed only on texts in the currently selected language.
  - **No Results State:** A message like "No results found for '[query]' in [Language]".

**User Flow:**
1. User taps the "Search" tab in the main navigation.
2. User types a query in the search box.
3. The list updates instantly with matching results from the current language's library.
4. Tapping a result navigates directly to the **Reader Screen** for that text.

---

## 4. Favorites Screen

**Objective:** Provide a dedicated place to view all favorited texts.

**Layout:**
- **Header:**
  - `[Screen Title: Favorites]`
- **Body:**
  - A simple vertical list of all texts the user has marked as a favorite.
  - Each item in the list displays the `[Text Title]`.
  - The list is filtered by the currently selected language. If a user has favorited items in multiple languages, only those for the active language are shown.
  - A message "You haven't favorited any texts in [Language] yet" is shown if the list is empty.

**User Flow:**
1. User taps the "Favorites" tab in the main navigation.
2. The screen displays all favorited texts for the currently selected language.
3. Tapping a text navigates to the **Reader Screen**.
4. A user can unfavorite an item from this screen (e.g., via a swipe gesture or an "edit" mode) or by long-pressing on the Home Screen.

---

## 5. Settings Screen

**Objective:** Allow users to configure global app settings.

**Layout:**
- **Header:**
  - `[Screen Title: Settings]`
- **Body:** A list of settings options, grouped into sections.
  - **General:**
    - `[Default Language]` - A tappable row that takes the user to the language selection modal.
    - `[Theme]` - Options to set the app-wide theme (Light/Dark/System Default).
  - **Reading:**
    - `[Reset All Reading Preferences]` - A button to reset all "Aa" settings for all texts to their default values.
  - **About:**
    - `[About BhaktiVani]`
    - `[App Version]`
    - `[Send Feedback]`
    - `[Privacy Policy]`
