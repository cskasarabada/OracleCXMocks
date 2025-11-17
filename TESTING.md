# Testing OracleCXMocks

This project is a static Redwood-inspired mock experience, so testing focuses on launching a local web server and exercising the interactive flows that read and write from `localStorage` via `assets/app.js`.

## 1. Start a local web server
1. From the repository root run:
   ```bash
   python3 -m http.server 8000
   ```
2. Open [http://localhost:8000/index.html](http://localhost:8000/index.html) in a modern browser (Chrome, Edge, or Firefox) to load the landing experience.
3. Use the top tab bar to deep-link into `sales_cloud.html`, `cx_lead.html`, `cx_opportunity.html`, `ppm_pursuit.html`, `ppm_construction.html`, and `analytics.html` so the shared `window.RWD` helper initializes on every page load.

## 2. Smoke-test the lifecycle flow
1. On **Lead** (`cx_lead.html`), fill out the form and click **Qualify → Create Opportunity** to confirm the lead converts and that you are redirected to the Opportunity tab.
2. On **Opportunity** (`cx_opportunity.html`), edit the amount/stage and click **Save Opportunity**. The activity timeline on the right should show the new entry.
3. Press **Create Pursuit in PPM (via OIC)**, wait for the notification toast, and then open **PPM Pursuit** to verify the estimate carried over.
4. Continue to **PPM Construction** and run **Create Construction Project** and **Mark Substantial Completion** to exercise the end-to-end journey.

## 3. Smart Actions regression
1. On **Lead**, click each Smart Action button (Log Call, Send Email, Schedule Meeting, Create Task). These buttons call `RWD.actLead(type)` in `assets/app.js`, which appends entries to `lead.activities`.
2. Confirm the **Activity & Timeline** list updates immediately; it polls `RWD.get()` every 800 ms so a new row should appear for each action.
3. On **Opportunity** (`cx_opportunity.html`), use the Smart Action buttons to trigger `RWD.actOppty(type)` and confirm the **Opportunity Timeline** updates in the same way.

## 4. Resetting state between runs
* Use the browser developer tools to clear the site’s `localStorage` entry named `rw_demo_v2`, or open the JavaScript console and run `RWD.reset();` before repeating the scenario to ensure a clean baseline.

Following the steps above mirrors the "index + lead smart actions" smoke test that has been referenced in previous commits, and validates that Smart Actions, OIC triggers, and downstream timelines are behaving as expected.
