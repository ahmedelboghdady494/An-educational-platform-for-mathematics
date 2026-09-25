# Paid access plan

The website is currently a static GitHub Pages frontend. A real payment system must be connected to a server/database so the site can know who has paid. Do not put payment secrets in `index.html`.

## How the paid flow should work

1. Student creates/logs into an account with an email or another unique account ID.
2. Student/parent opens the payment page and completes payment.
3. The payment provider sends a server-side confirmation/webhook.
4. The backend stores the account as `paid = true` (and optionally an expiry date).
5. On login, the site asks the backend for the student's entitlement.
6. Paid students see the lessons, quizzes, solutions, etc. Unpaid students see the locked-access screen.
7. The student does not receive a secret admin password. Access is tied to the account that paid.

## Important for this project

Because the site owner is under 18, a parent/guardian should handle the merchant/payment account and any money collection. The payment provider's age and account rules must be followed.

## What is included in this package

- The frontend is prepared for a paid-access status.
- A real payment provider checkout URL is intentionally not hard-coded because it requires the owner's/guardian's payment account.
- After a payment account is set up, its checkout link can be inserted into the site and the backend can verify payments.

## Visitor counter

Run `supabase_setup.sql` once in the Supabase SQL Editor. The updated `index.html` calls the `register_page_load` RPC. The visible number is only read on page load/reload; it does not animate every second.
